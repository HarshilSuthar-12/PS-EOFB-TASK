import httpx
from auth import get_token
from logger import logger

GRAPH_API_BASE_URL = "https://graph.microsoft.com/v1.0"

async def fetch_employee_info(user_id: str):
    logger.debug(f"Starting fetch_employee_info for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    select_fields = "id,displayName,mail,jobTitle,createdDateTime,employeeId,employeeType,city,officeLocation,country,department,accountEnabled,userPrincipalName"
    try:
        async with httpx.AsyncClient() as client:
            user_info_response = await client.get(
                f"{GRAPH_API_BASE_URL}/users/{user_id}?$select={select_fields}",
                headers=headers
            )
            user_info_response.raise_for_status()  # Raises an exception for 4XX/5XX responses
            user_data = user_info_response.json()
            
            # Additional fields
            employee_info = {
                "id": user_data.get("id"),
                "name": user_data.get("displayName"),
                "email": user_data.get("mail"),
                "position": user_data.get("jobTitle"),
                "creationDate": user_data.get("createdDateTime"),
                "employeeID": user_data.get("employeeId"),
                "employeeType": user_data.get("employeeType"),
                "city": user_data.get("city"),
                "officeLocation": user_data.get("officeLocation"),
                "country": user_data.get("country"),
                "department": user_data.get("department"),
                "accountStatus": "Active" if user_data.get("accountEnabled", False) else "Disabled",
                "userPrincipalName":user_data.get("userPrincipalName"),
                # Default value for manager if not present
                "manager": "manager not assigned"
            }
            
            # Attempt to fetch manager details, if available
            manager_info_response = await client.get(f"{GRAPH_API_BASE_URL}/users/{user_id}/manager", headers=headers)
            if manager_info_response.status_code == 200:
                manager_data = manager_info_response.json()
                employee_info["manager"] = {
                    "id": manager_data.get("id"),
                    "name": manager_data.get("displayName"),
                    "email": manager_data.get("mail")
                }
            elif manager_info_response.status_code == 404:
                # No manager assigned, keep default value
                logger.debug("Manager not assigned for user ID: {user_id}")
            else:
                manager_info_response.raise_for_status()

            groups_info = await list_employee_groups(user_id)
            groups_active_status = []
            for group in groups_info.get("groups", []):
                group_active_status = {"id": group["id"], "name": group["name"], "activeStatus": True}
                groups_active_status.append(group_active_status)

            licenses_info = await fetch_employee_licenses(user_id)
            licenses_active_status = []
            for license in licenses_info.get("licenses", []):
                license_active_status = {"id": license["id"], "name": license["name"], "activeStatus": True}
                licenses_active_status.append(license_active_status)

            employee_info["groupsActiveStatus"] = groups_active_status
            employee_info["licensesActiveStatus"] = licenses_active_status

            logger.debug(f"Successfully fetched extended employee info for user ID: {user_id}")
            return employee_info
    except Exception as e:
        logger.error(f"Failed to fetch extended employee info for user ID: {user_id}. Error: {e}", exc_info=True)
        raise

async def list_employee_groups(user_id: str):
    logger.debug(f"Starting list_employee_groups for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    try:
        async with httpx.AsyncClient() as client:
            groups_response = await client.get(f"{GRAPH_API_BASE_URL}/users/{user_id}/memberOf", headers=headers)
            groups_response.raise_for_status()
            groups_data = groups_response.json()
            groups_list = []
            for group in groups_data.get("value", []):
                if group["@odata.type"] == "#microsoft.graph.group":
                    group_info = {
                        "id": group["id"], 
                        "name": group["displayName"], 
                        "activeStatus": True
                    }
                    groups_list.append(group_info)
            logger.debug(f"Successfully listed groups for user ID: {user_id} with active status.")
            return {"groups": groups_list}
    except Exception as e:
        logger.error(f"Failed to list groups for user ID: {user_id} with active status. Error: {e}", exc_info=True)
        raise

async def fetch_employee_licenses(user_id: str):
    logger.debug(f"Starting fetch_employee_licenses for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    try:
        async with httpx.AsyncClient() as client:
            licenses_response = await client.get(f"{GRAPH_API_BASE_URL}/users/{user_id}/licenseDetails", headers=headers)
            licenses_response.raise_for_status()
            licenses_data = licenses_response.json()
            licenses_list = []
            for license_detail in licenses_data.get("value", []):
                license_info_response = await client.get(f"{GRAPH_API_BASE_URL}/subscribedSkus/{license_detail['skuId']}", headers=headers)
                if license_info_response.status_code == 200:
                    license_info_data = license_info_response.json()
                    license_active_status = license_info_data.get("capabilityStatus", "Enabled") == "Enabled"
                else:
                    license_active_status = False
                licenses_list.append({
                    "id": license_detail["skuId"], 
                    "name": license_detail["skuPartNumber"],
                    "activeStatus": license_active_status
                })
            logger.debug(f"Successfully fetched licenses for user ID: {user_id} with active status.")
            return {"licenses": licenses_list}
    except Exception as e:
        logger.error(f"Failed to fetch licenses for user ID: {user_id} with active status. Error: {e}", exc_info=True)
        raise

async def remove_employee_from_groups(user_id: str):
    logger.debug(f"Starting remove_employee_from_groups for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    removed_groups = []
    errors = []

    groups_info = await list_employee_groups(user_id)
    if not groups_info.get("groups"):
        logger.debug(f"No groups found for user ID: {user_id}")
        return {"message": "No groups to remove", "removed_groups": removed_groups, "errors": errors}

    async with httpx.AsyncClient() as client:
        for group in groups_info["groups"]:
            try:
                user_info = await fetch_employee_info(user_id)
                user_object_id = user_info.get("id")
                if not user_object_id:
                    raise ValueError(f"Could not find object ID for user {user_id}")
                delete_url = f"{GRAPH_API_BASE_URL}/groups/{group['id']}/members/{user_object_id}/$ref"
                response = await client.delete(delete_url, headers=headers)
                response.raise_for_status()
                removed_groups.append({"id": group["id"], "name": group["name"]})
                logger.debug(f"Successfully removed {user_id} from group {group['name']}")
            except httpx.HTTPStatusError as e:
                logger.error(f"HTTP error occurred while removing {user_id} from group {group['name']}. Status code: {e.response.status_code}. Error: {e}", exc_info=True)
                errors.append({"group_id": group["id"], "error": str(e)})
            except Exception as e:
                logger.error(f"Failed to remove {user_id} from group {group['name']}. Error: {e}", exc_info=True)
                errors.append({"group_id": group["id"], "error": str(e)})

    return {"message": f"Completed removal attempts for {user_id}", "removed_groups": removed_groups, "errors": errors}

async def revoke_employee_licenses_by_id(user_id: str):
    logger.debug(f"Starting revoke_employee_licenses_by_id for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    licenses_info = await fetch_employee_licenses(user_id)
    if not licenses_info.get("licenses"):
        logger.debug(f"No licenses found for user ID: {user_id}")
        return {"message": "No licenses to revoke", "revoked_licenses": [], "errors": []}

    revoked_licenses = []
    errors = []

    async with httpx.AsyncClient() as client:
        for license in licenses_info["licenses"]:
            try:
                revoke_url = f"{GRAPH_API_BASE_URL}/users/{user_id}/assignLicense"
                data = {
                    "addLicenses": [],
                    "removeLicenses": [license["id"]]
                }
                response = await client.post(revoke_url, headers=headers, json=data)
                response.raise_for_status()
                revoked_licenses.append({"id": license["id"], "name": license["name"]})
                logger.debug(f"Successfully revoked license {license['name']} for {user_id}")
            except httpx.HTTPStatusError as e:
                logger.error(f"HTTP error occurred while revoking license {license['name']} for {user_id}. Status code: {e.response.status_code}. Error: {e}", exc_info=True)
                errors.append({"license_id": license["id"], "error": str(e)})
            except Exception as e:
                logger.error(f"Failed to revoke license {license['name']} for {user_id}. Error: {e}", exc_info=True)
                errors.append({"license_id": license["id"], "error": str(e)})

    return {"message": f"Completed license revocation attempts for {user_id}", "revoked_licenses": revoked_licenses, "errors": errors}

async def fetch_manager_info(user_id: str):
    logger.debug(f"Starting fetch_manager_info for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    manager_info_url = f"{GRAPH_API_BASE_URL}/users/{user_id}/manager"

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(manager_info_url, headers=headers)
            response.raise_for_status()
            manager_data = response.json()
            return {
                "id": manager_data.get("id"),
                "name": manager_data.get("displayName"),
                "email": manager_data.get("mail")
            }
    except httpx.HTTPStatusError as e:
        if e.response.status_code == 404:
            return {"message": "manager not assigned"}
        else:
            logger.error(f"HTTP error occurred: {e}", exc_info=True)
    except Exception as e:
        logger.error(f"An error occurred while fetching manager info: {e}", exc_info=True)

    return None

async def disable_employee_account(user_id: str):
    logger.debug(f"Starting disable_employee_account for user_id: {user_id}")
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}
    patch_data = {"accountEnabled": False}

    try:
        async with httpx.AsyncClient() as client:
            response = await client.patch(
                f"https://graph.microsoft.com/v1.0/users/{user_id}",
                headers=headers,
                json=patch_data
            )
            if response.status_code not in range(200, 300):
                raise Exception(f"Failed to disable account for user ID: {user_id}. Status code: {response.status_code}, Response: {response.text}")
            logger.debug(f"Successfully disabled account for user ID: {user_id}")
            return {"status": "success", "message": f"Successfully disabled account for user ID: {user_id}"}
    except Exception as e:
        logger.error(f"An error occurred while disabling the account for user ID: {user_id}. Error: {e}", exc_info=True)
        raise