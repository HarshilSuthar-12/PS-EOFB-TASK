from msal import ConfidentialClientApplication
import os

CLIENT_ID = "00fd4b42-5393-4696-a173-75b237c5fb87"
CLIENT_SECRET = "Mu88Q~d8wuyUu.0J_mhv6TdM7ouqEwamVeF4saTK"
TENANT_ID = "058c37d3-71cf-4a95-94a5-033acaf07be5"
if not CLIENT_ID or not CLIENT_SECRET or not TENANT_ID:
    raise ValueError("One or more environment variables (MSGRAPH_CLIENT_ID, MSGRAPH_CLIENT_SECRET, MSGRAPH_TENANT_ID) are not set.")

AUTHORITY = f"https://login.microsoftonline.com/{TENANT_ID}"

app = ConfidentialClientApplication(
    CLIENT_ID,
    authority=AUTHORITY,
    client_credential=CLIENT_SECRET,
)

TOKEN_CACHE = {}

def acquire_token():
    result = app.acquire_token_silent(scopes=["https://graph.microsoft.com/.default"], account=None)
    if not result:
        result = app.acquire_token_for_client(scopes=["https://graph.microsoft.com/.default"])
        if "access_token" in result:
            TOKEN_CACHE["token"] = result["access_token"]
            print("Token acquired successfully.")
            return result["access_token"]
        else:
            error_description = result.get("error_description", "No error description provided.")
            print(f"Failed to acquire token. Error: {error_description}")
            # Not raising ValueError here to allow for error handling or retries in the calling code
    else:
        print("Token acquired from cache.")
    return None

def get_token():
    token = TOKEN_CACHE.get("token", acquire_token())
    if not token:
        print("Failed to retrieve token.")
        raise ValueError("Failed to retrieve token.")
    else:
        print("Token retrieved successfully.")
        print(token)
    return token