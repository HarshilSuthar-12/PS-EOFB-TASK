import httpx
import asyncio
from auth import get_token

async def migrate_emails(employee_email: str, manager_email: str, start_date: str, end_date: str, delete_after_migration: bool):
    """
    Asynchronously migrates emails from an employee's mailbox to their manager's mailbox within a specified date range.
    Optionally deletes emails from the employee's mailbox after successful migration.
    """
    token = get_token()
    headers = {"Authorization": f"Bearer {token}"}

    # URL to fetch emails from the employee's mailbox with a date filter
    fetch_emails_url = f"https://graph.microsoft.com/v1.0/users/{employee_email}/messages?$filter=receivedDateTime ge {start_date} and receivedDateTime le {end_date}"

    async with httpx.AsyncClient() as client:
        try:
            # Fetching emails
            fetch_response = await client.get(fetch_emails_url, headers=headers)
            fetch_response.raise_for_status()  # Raises exception for 4XX/5XX responses
            emails = fetch_response.json()['value']

            # For each email, create a new email item in the manager's mailbox with the content of the employee's email
            for email in emails:
                create_email_url = f"https://graph.microsoft.com/v1.0/users/{manager_email}/messages"
                email_content = {
                    "subject": email['subject'],
                    "body": email['body'],
                    "toRecipients": [{"emailAddress": {"address": manager_email}}],
                    # Additional fields and details might be required here depending on the Graph API's requirements
                }
                create_response = await client.post(create_email_url, headers=headers, json=email_content)
                create_response.raise_for_status()

            # After successful migration, optionally delete emails from the employee's mailbox
            if delete_after_migration:
                for email in emails:
                    delete_url = f"https://graph.microsoft.com/v1.0/users/{employee_email}/messages/{email['id']}"
                    delete_response = await client.delete(delete_url, headers=headers)
                    delete_response.raise_for_status()  # Handle potential errors gracefully

            return {"status": "success", "detail": f"Emails migrated successfully from {employee_email} to {manager_email}."}
        except httpx.HTTPStatusError as e:
            return {"status": "error", "detail": f"HTTP error occurred: {str(e)}."}
        except Exception as e:
            return {"status": "error", "detail": f"An error occurred: {str(e)}."}