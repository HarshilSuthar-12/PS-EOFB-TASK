# msgraph-backend

A Python FastAPI backend designed to automate the offboarding process of an employee through interactions with the Microsoft Graph API. This system simplifies tasks such as revoking access, removing from groups, transferring emails, and ensuring a smooth transition when an employee leaves the company, with additional features to fetch and display active statuses of groups and licenses.

## Overview

The msgraph-backend project utilizes Python and FastAPI for creating a high-performance, asynchronous API service. It leverages msgraph-core and msgraph-sdk-python libraries to interact with the Microsoft Graph API, facilitating efficient communication with Azure services. The architecture is designed with security in mind, using OAuth2 authentication through the MSAL library. This backend service is intended for use by IT administrators for executing offboarding processes via API calls, without the need for direct interaction with Azure AD or email services. Enhanced with features for active status checks, the system provides a comprehensive view of an employee's association with groups and licenses.

## Features

- **Employee Information Retrieval**: Fetch detailed employee information including managerial details, group memberships, license assignments, and their active statuses, with fallbacks for unassigned managers.
- **Confirmation and Removal Operations**: Secure endpoints to confirm offboarding intentions and to remove the employee from all associated groups and licenses, with checks for active statuses.
- **Email Migration**: Provide capabilities to migrate the employee's email contents to their manager's mailbox, ensuring no critical information is lost.
- **Final Confirmation**: Generate a comprehensive summary of the offboarding actions taken, including removal confirmations and any remaining cleanup tasks, with a focus on groups and licenses active statuses.

## Getting started

### Requirements

- Python 3.8 or newer
- FastAPI
- Uvicorn
- MSAL for Python
- httpx

### Quickstart

1. Clone the repository to your local machine.
2. Install the required dependencies using `pip install -r requirements.txt`.
3. Set up the necessary environment variables in the `.env` file:
   - `MSGRAPH_CLIENT_ID`
   - `MSGRAPH_CLIENT_SECRET`
   - `MSGRAPH_TENANT_ID`
4. Run the application using `uvicorn main:app --reload`

### License

Copyright (c) 2024.