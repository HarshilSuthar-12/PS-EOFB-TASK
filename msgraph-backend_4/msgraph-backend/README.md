# MSGraph-Backend

A Python FastAPI backend designed to automate the offboarding process of an employee through interactions with the Microsoft Graph API. This application streamlines the offboarding process by handling employee information retrieval, confirmation and removal operations, email migration, and providing final confirmation through efficient and secure interactions with Azure services.

## Overview

The MSGraph-Backend leverages Python and FastAPI to create a high-performance, asynchronous API service. It uses the msgraph-core and msgraph-sdk-python libraries for communicating with the Microsoft Graph API, and employs OAuth2 authentication via the MSAL library for security. The backend is focused on server-side operations, providing a robust and scalable system for managing employee offboarding processes without direct interaction with Azure AD or email services.

## Features

- **Employee Information Retrieval**: Fetches detailed information about an employee, their manager, group memberships, and license assignments.
- **Confirmation and Removal Operations**: Handles the confirmation of the offboarding process and removes the employee from all associated groups and licenses.
- **Email Migration**: Facilitates the transfer of emails from the employee's mailbox to their manager's mailbox.
- **Final Confirmation**: Provides a summary of the offboarding actions taken, confirming the removal of the employee from Azure AD and associated groups and licenses.
- **Security and Logging**: Utilizes OAuth2 for secure API access and implements detailed logging for each process.

## Getting Started

### Requirements

- Python 3.8 or newer
- FastAPI
- Uvicorn
- MSAL for Python
- httpx

### Quickstart

1. Clone the repository to your local machine.
2. Install the required dependencies using `pip install -r requirements.txt`.
3. Set up the necessary environment variables in the `.env` file.
4. Run the application using `uvicorn main:app --reload`.

### License

Copyright (c) 2024.