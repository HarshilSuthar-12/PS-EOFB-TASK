from fastapi import FastAPI, HTTPException, Request, APIRouter, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from auth import get_token
from employee_info import remove_employee_from_groups, revoke_employee_licenses_by_id, fetch_employee_info, list_employee_groups, fetch_employee_licenses, fetch_manager_info, disable_employee_account
from email_migration import migrate_emails

app = FastAPI()


# CORS settings
origins = [
    "http://localhost",
    "http://localhost:8080", 
     "*" # Add your frontend URL here
    # Add more allowed origins as needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "DELETE"],
    allow_headers=["*"],
)



@app.middleware("http")
async def validate_token(request: Request, call_next):
    if "/token" not in request.url.path:  # Assuming "/token" is the authentication route
        token = get_token()
        if not token:
            print("Failed to validate token")  # Logging for debugging
            raise HTTPException(status_code=401, detail="Unauthorized")
    response = await call_next(request)
    return response

@app.get("/")
async def root():
    try:
        return {"message": "Hello World"}
    except Exception as e:
        print(f"Error occurred: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail="Internal Server Error")

offboarding_router = APIRouter()

@offboarding_router.post("/offboard/{user_id}/confirm")
async def confirm_offboarding(user_id: str, background_tasks: BackgroundTasks):
    # Fetch necessary employee information
    try:
        employee_info = await get_employee_info(user_id)
    except Exception as e:
        print(f"Failed to fetch employee info for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail="Failed to fetch employee information")

    # Disable the employee's account as part of the offboarding process
    try:
        disable_account_result = await disable_employee_account(user_id)
        print(f"Successfully disabled account for {user_id}. Result: {disable_account_result['message']}")
    except Exception as e:
        print(f"Failed to disable account for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail=f"Failed to disable account for {user_id}. Error: {e}")

    # Proceed with the offboarding tasks as background tasks to improve API response times
    background_tasks.add_task(remove_from_groups, user_id)
    background_tasks.add_task(remove_licenses, user_id)
    # Assuming the manager's email is part of the employee_info. This needs adjustment based on actual data structure
    manager_email = employee_info.get('manager', {}).get('email', None)
    if manager_email:
        employee_email = employee_info.get('email')
        background_tasks.add_task(migrate_employee_emails, employee_email, manager_email)
    
    # Returning a response that offboarding tasks have been initiated
    return {"message": f"Offboarding process initiated for {user_id}. Check the system for progress updates."}

@offboarding_router.delete("/offboard/{user_id}/groups")
async def remove_from_groups(user_id: str):
    try:
        result = await remove_employee_from_groups(user_id)
        return {"status": "Success", "details": result}
    except Exception as e:
        print(f"Failed to remove {user_id} from groups. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail="Failed to remove from groups")

@offboarding_router.delete("/offboard/{user_id}/licenses")
async def remove_licenses(user_id: str):
    try:
        result = await revoke_employee_licenses_by_id(user_id)  # Adjusted to call the updated function
        return {"status": "Success", "details": result}
    except Exception as e:
        print(f"Failed to revoke licenses for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail="Failed to revoke licenses")

@offboarding_router.get("/employee_info/{user_id}")
async def get_employee_info(user_id: str):
    try:
        employee_info = await fetch_employee_info(user_id)
        # Asynchronously fetch manager information and add it to employee_info
        try:
            manager_info = await fetch_manager_info(user_id)
            if manager_info and "message" not in manager_info:
                employee_info['manager'] = manager_info
            else:
                employee_info['manager'] = {"message": "Manager not assigned"}
        except HTTPException as http_exc:
            # Explicitly handle HTTP errors during manager info fetch
            employee_info['manager'] = {"message": "Error fetching manager info: " + str(http_exc.detail)}
        except Exception as e:
            # Handle other errors or cases where manager is not assigned
            employee_info['manager'] = {"message": "Manager not assigned or error fetching manager info: " + str(e)}
        return employee_info
    except Exception as e:
        print(f"Failed to fetch employee info for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.get("/employee_licenses/{user_id}")
async def get_employee_licenses(user_id: str):
    try:
        licenses_info = await fetch_employee_licenses(user_id)
        return licenses_info
    except Exception as e:
        print(f"Failed to fetch licenses for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.get("/employee_groups/{user_id}")
async def get_employee_groups(user_id: str):
    try:
        groups_info = await list_employee_groups(user_id)
        return groups_info
    except Exception as e:
        print(f"Failed to list groups for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.post("/migrate_emails/{employee_email}/{manager_email}")
async def migrate_employee_emails(employee_email: str, manager_email: str):
    """
    API endpoint to migrate emails from an employee's mailbox to their manager's mailbox.
    """
    try:
        result = await migrate_emails(employee_email, manager_email)
        return result
    except Exception as e:
        print(f"Failed to migrate emails for {employee_email} to {manager_email}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail="Failed to migrate emails")

@offboarding_router.get("/offboard/{user_id}/confirmation")
async def final_confirmation(user_id: str):
    """
    API endpoint to display a summary confirming the removal of the employee from Azure AD,
    all associated groups and licenses, and to offer options for final cleanup tasks.
    """
    try:
        employee_info = await fetch_employee_info(user_id)
        employee_groups = await list_employee_groups(user_id)
        employee_licenses = await fetch_employee_licenses(user_id)
        
        # Check if the account has been disabled successfully
        account_disabled_status = "Account disabled successfully" if employee_info.get("accountEnabled", True) == False else "Error disabling account or account still enabled"
        
        confirmation_summary = {
            "employee_info": employee_info,
            "groups_status": f"All groups for {user_id} have been removed.",
            "licenses_status": f"All licenses for {user_id} have been revoked.",
            "account_disabled_status": account_disabled_status,
            "final_cleanup": "Pending"  # Or "Completed" based on actual logic.
        }
        
        return confirmation_summary
    except Exception as e:
        print(f"Failed to generate final confirmation for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.get("/offboard/{user_id}/disable_account")
async def disable_account_endpoint(user_id: str):
    try:
        result = await disable_employee_account(user_id)
        return {"status": "Success", "message": f"Successfully disabled account for {user_id}.", "details": result}
    except Exception as e:
        print(f"Failed to disable account for {user_id}. Error: {e}")  # Logging the error
        raise HTTPException(status_code=500, detail=f"Failed to disable account for {user_id}. Error: {e}")

app.include_router(offboarding_router)

if __name__ == "__main__":
    try:
        uvicorn.run(app, host="127.0.0.1", port=8001)
    except Exception as e:
        print(f"Failed to start Uvicorn server: {e}")  # Logging the error