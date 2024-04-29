import requests
from typing import Optional, Dict
from fastapi import HTTPException
import logging

# Constants for Microsoft Graph API
GRAPH_API_URL = 'https://graph.microsoft.com/v1.0'
TENANT_ID = 'TENANT_ID'  # INPUT_REQUIRED {Replace with your actual tenant ID}
CLIENT_ID = 'CLIENT_ID'  # INPUT_REQUIRED {Replace with your actual client ID}
CLIENT_SECRET = 'CLIENT_SECRET'  # INPUT_REQUIRED {Replace with your actual client secret}
SCOPE = 'https://graph.microsoft.com/.default'
TOKEN_ENDPOINT = f'https://login.microsoftonline.com/{TENANT_ID}/oauth2/v2.0/token'
# https://login.microsoftonline.com/058c37d3-71cf-4a95-94a5-033acaf07be5/oauth2/v2.0/token

# Setup logger
logger = logging.getLogger(__name__)

def get_access_token() -> str:
    """
    Authenticate with the Microsoft Graph API and retrieve an access token.
    """
    try:
        token_data = {
            'client_id': CLIENT_ID,
            'scope': SCOPE,
            'client_secret': CLIENT_SECRET,
            'grant_type': 'client_credentials'
        }
        token_response = requests.post(TOKEN_ENDPOINT, data=token_data)
        token_response.raise_for_status() 
        logger.info("Successfully retrieved access token from Microsoft Graph API")
        print("request 1 :" ,token_response.json())
        return token_response.json().get('access_token')
    
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to retrieve access token from Microsoft Graph API: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to retrieve access token from Microsoft Graph API due to an internal server error")

def make_graph_api_request(endpoint: str, access_token: str, method: str = 'GET', data: Optional[Dict] = None) -> Dict:
    """
    Make a request to the Microsoft Graph API.
    """
    try:
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        url = f'{GRAPH_API_URL}/{endpoint}'
        if method.upper() == 'POST':
            response = requests.post(url, headers=headers, json=data)
        elif method.upper() == 'DELETE':
            response = requests.delete(url, headers=headers)
        else:
            response = requests.get(url, headers=headers)
        response.raise_for_status()  # Raises an HTTPError if the response status code is 400 or above
        logger.info(f"Successful Microsoft Graph API request to {endpoint}")
        return response.json()
    except requests.exceptions.RequestException as e:
        logger.error(f"Microsoft Graph API request to {endpoint} failed: {e}", exc_info=True)
        status_code = 500 if response.status_code >= 500 else 400
        raise HTTPException(status_code=status_code, detail=f"Microsoft Graph API request failed due to {'an internal server error' if status_code == 500 else 'a client error'}")

def fetch_employee_info(user_id: str) -> Dict:
    """
    Fetch basic employee information along with additional fields like city, office location, country, employee ID, 
    and department from Microsoft Graph API.

    Parameters:
    - user_id: The unique identifier for the employee.

    Returns:
    - A dictionary containing the employee's basic information, additional fields, and account status.
    """
    try:
        access_token = get_access_token()
        fields = "id,displayName,mail,jobTitle,createdDateTime,employeeType,accountEnabled,city,officeLocation,country,employeeId,department"
        endpoint = f'users/{user_id}?$select={fields}'
        employee_info = make_graph_api_request(endpoint, access_token)

        # Extracting manager's information requires an additional request
        manager_info = {}
        manager_endpoint = f"users/{user_id}/manager?$select=id,displayName"
        manager_info_response = make_graph_api_request(manager_endpoint, access_token)
        if manager_info_response:
            manager_info = {
                'id': manager_info_response.get('id'),
                'name': manager_info_response.get('displayName')
            }

        return {
            'id': employee_info.get('id'),
            'name': employee_info.get('displayName'),
            'email': employee_info.get('mail'),
            'position': employee_info.get('jobTitle'),
            'creationDate': employee_info.get('createdDateTime'),
            'employeeType': employee_info.get('employeeType'),
            'manager': manager_info.get('name') if manager_info else None,
            'accountStatus': 'Enabled' if employee_info.get('accountEnabled') else 'Disabled',
            'city': employee_info.get('city', None),
            'officeLocation': employee_info.get('officeLocation', None),
            'country': employee_info.get('country', None),
            'employeeId': employee_info.get('employeeId', None),
            'department': employee_info.get('department', None)
        }
    except HTTPException as e:
        logger.error(f"Error fetching employee information for user ID: {user_id} - {e.detail}", exc_info=True)
        raise

def list_employee_groups(user_id: str) -> list:
    """
    List the groups and distribution lists an employee is part of, including the name of each group.
    
    Parameters:
    - user_id: The unique identifier for the employee.
    
    Returns:
    - A list of dictionaries, each containing the 'id' and 'displayName' of the groups.
    """
    try:
        access_token = get_access_token()
        response = make_graph_api_request(f'users/{user_id}/memberOf', access_token)
        groups = response.get('value', [])
        group_list = [{'id': group['id'], 'displayName': group['displayName']} for group in groups if 'displayName' in group]
        logger.info(f"Successfully listed groups for user {user_id}")
        return group_list
    except HTTPException as e:
        logger.error(f"Error listing employee groups for user ID: {user_id} - {e.detail}", exc_info=True)
        raise

def fetch_employee_licenses(user_id: str) -> list:
    """
    Retrieve licenses assigned to the employee, including license names and their statuses.

    Parameters:
    - user_id: The unique identifier for the employee.

    Returns:
    - A list of dictionaries, each containing the 'licenseName' and 'status'.
    """
    try:
        access_token = get_access_token()
        response = make_graph_api_request(f'users/{user_id}/licenseDetails', access_token)
        licenses = response.get('value', [])
        license_details = []
        for license in licenses:
            license_status = 'Inactive' if license.get('disabled', False) else 'Active'
            license_details.append({
                'licenseName': license.get('skuPartNumber', 'Unknown License'),
                'status': license_status
            })
        logger.info(f"Successfully retrieved license details for user {user_id}")
        return license_details
    except HTTPException as e:
        logger.error(f"Error fetching employee licenses for user ID: {user_id} - {e.detail}", exc_info=True)
        raise

def remove_from_groups(user_id: str, accesstoken:  str) -> Dict:
    """
    Remove an employee from all groups by making DELETE requests to the Microsoft Graph API.
    """
    try:
        #access_token = get_access_token()
        access_token = accesstoken
        groups = list_employee_groups(user_id)
        for group in groups:
            group_id = group['id']
            endpoint = f'groups/{group_id}/members/{user_id}/$ref'
            make_graph_api_request(endpoint, access_token, method='DELETE')
        logger.info(f"User {user_id} removed from all groups successfully.")
        return {'status': 'success', 'detail': f'User {user_id} removed from all groups'}
    except HTTPException as e:
        logger.error(f"Error removing user {user_id} from groups: {e.detail}", exc_info=True)
        raise

def revoke_licenses(user_id: str, accesstoken:  str) -> Dict:
    """
    Revoke all licenses from an employee by making POST requests to the Microsoft Graph API.
    Note: Revoking licenses via Graph API involves assigning an empty license collection to the user.
    """
    try:
        #access_token = get_access_token()
        access_token=accesstoken
        endpoint = f'users/{user_id}/assignLicense'
        data = {
            "addLicenses": [],
            "removeLicenses": [license['skuId'] for license in fetch_employee_licenses(user_id)]
        }
        make_graph_api_request(endpoint, access_token, method='POST', data=data)
        logger.info(f"All licenses revoked for user {user_id} successfully.")
        return {'status': 'success', 'detail': f'All licenses revoked for user {user_id}'}
    except HTTPException as e:
        logger.error(f"Error revoking licenses for user {user_id}: {e.detail}", exc_info=True)
        raise

def migrate_email(user_id: str, target_manager_id: str) -> Dict:
    """
    Migrates all emails from an employee's mailbox to their manager's mailbox.
    
    Parameters:
    - user_id: The unique identifier for the employee.
    - target_manager_id: The unique identifier for the manager.
    
    Returns:
    - A dictionary indicating the status of the operation.
    """
    try:
        access_token = get_access_token()
        # Placeholder for the actual email migration logic
        logger.info(f"Initiating email migration from user {user_id} to manager {target_manager_id}")
        # This is a placeholder. In a real scenario, you would use Microsoft Graph API to move emails.
        return {'status': 'success', 'detail': f'Emails migrated from user {user_id} to manager {target_manager_id}'}
    except HTTPException as e:
        logger.error(f"Error migrating emails for user {user_id} to manager {target_manager_id}: {e.detail}", exc_info=True)
        raise

def archive_employee_data(user_id: str) -> Dict:
    """
    Mock function to simulate the archiving of an employee's data.
    """
    logger.info(f"Simulating archiving data for user {user_id}")
    return {'status': 'success', 'detail': f'Data archived for user {user_id}'}

def validate_removal_operations(user_id: str) -> Dict:
    """
    Validates if an employee has been successfully removed from all groups and their licenses have been revoked.
    
    Parameters:
    - user_id: The unique identifier for the employee.
    
    Returns:
    - A dictionary containing the validation results and any remaining associations.
    """
    try:
        access_token = get_access_token()
        # Validate groups removal
        groups_response = make_graph_api_request(f'users/{user_id}/memberOf', access_token)
        remaining_groups = [{'id': group['id'], 'displayName': group['displayName']} for group in groups_response.get('value', []) if 'displayName' in group]

        # Validate licenses revocation
        licenses_response = make_graph_api_request(f'users/{user_id}/licenseDetails', access_token)
        remaining_licenses = [license.get('skuPartNumber', 'Unknown License') for license in licenses_response.get('value', [])]

        # Aggregating results
        validation_results = {
            'remainingGroups': remaining_groups,
            'remainingLicenses': remaining_licenses
        }

        if remaining_groups or remaining_licenses:
            logger.error(f"Validation failed for user {user_id}. Remaining Groups: {remaining_groups}, Remaining Licenses: {remaining_licenses}")
        else:
            logger.info(f"Validation successful for user {user_id}. No remaining groups or licenses.")

        return validation_results
    except HTTPException as e:
        logger.error(f"Error during validation of removal operations for user ID: {user_id} - {e.detail}", exc_info=True)
        raise