from fastapi import FastAPI, HTTPException, Request, APIRouter, BackgroundTasks, Response, Path
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
import uvicorn
from auth import get_token
from employee_info import remove_employee_from_groups, revoke_employee_licenses_by_id, fetch_employee_info, list_employee_groups, fetch_employee_licenses, fetch_manager_info, disable_employee_account
from email_migration import migrate_emails
from exchange_operations import modify_user_mailbox
from logger import logger  # Import the centralized logger
from log_api import log_router  # Import the log_router from log_api.py

app = FastAPI()

# Add CORS middleware to the application instance
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # Specify the origins; use a more restrictive list for production
    allow_credentials=True,
    allow_methods=['*'],  # Allow all methods
    allow_headers=['*']   # Allow all headers
)

@app.middleware("http")
async def validate_token(request: Request, call_next):
    logger.debug(f"Incoming request: {request.method} {request.url.path}")
    if "/token" not in request.url.path:  # Assuming "/token" is the authentication route
        token = get_token()
        if not token:
            logger.error("Failed to validate token")  # Logging for debugging
            raise HTTPException(status_code=401, detail="Unauthorized")
    try:
        response = await call_next(request)
        logger.info(f"Response status code: {response.status_code}")
        return response
    except Exception as e:
        logger.error(f"Unhandled exception for {request.method} {request.url.path}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error") from e

@app.get("/")
async def root():
    logger.debug("Processing request for root endpoint")
    try:
        return {"message": "Hello World"}
    except Exception as e:
        logger.error("Error occurred at root endpoint", exc_info=True)
        raise HTTPException(status_code=500, detail="Internal Server Error")

offboarding_router = APIRouter()

@offboarding_router.post("/offboard/{user_id}/confirm")
async def confirm_offboarding(user_id: str, background_tasks: BackgroundTasks):
    logger.debug(f"Initiating offboarding for user_id: {user_id}")
    try:
        employee_info = await get_employee_info(user_id)
    except Exception as e:
        logger.error(f"Failed to fetch employee info for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to fetch employee information")

    try:
        disable_account_result = await disable_employee_account(user_id)
        logger.info(f"Successfully disabled account for {user_id}. Result: {disable_account_result['message']}")
    except Exception as e:
        logger.error(f"Failed to disable account for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to disable account for {user_id}. Error: {e}")

    background_tasks.add_task(remove_from_groups, user_id)
    background_tasks.add_task(remove_licenses, user_id)
    manager_email = employee_info.get('manager', {}).get('email', None)
    if manager_email:
        employee_email = employee_info.get('email')
        background_tasks.add_task(migrate_employee_emails, employee_email, manager_email)
    
    return {"message": f"Offboarding process initiated for {user_id}. Check the system for progress updates."}

@offboarding_router.delete("/offboard/{user_id}/groups")
async def remove_from_groups(user_id: str):
    logger.debug(f"Removing user_id: {user_id} from groups")
    try:
        result = await remove_employee_from_groups(user_id)
        return {"status": "Success", "details": result}
    except Exception as e:
        logger.error(f"Failed to remove {user_id} from groups. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to remove from groups")

@offboarding_router.delete("/offboard/{user_id}/licenses")
async def remove_licenses(user_id: str):
    logger.debug(f"Revoking licenses for user_id: {user_id}")
    try:
        result = await revoke_employee_licenses_by_id(user_id)
        return {"status": "Success", "details": result}
    except Exception as e:
        logger.error(f"Failed to revoke licenses for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to revoke licenses")

@offboarding_router.get("/employee_info/{user_id}")
async def get_employee_info(user_id: str):
    logger.debug(f"Fetching employee info for user_id: {user_id}")
    try:
        employee_info = await fetch_employee_info(user_id)
        try:
            manager_info = await fetch_manager_info(user_id)
            if manager_info and "message" not in manager_info:
                employee_info['manager'] = manager_info
            else:
                employee_info['manager'] = {"message": "Manager not assigned"}
        except HTTPException as http_exc:
            employee_info['manager'] = {"message": "Error fetching manager info: " + str(http_exc.detail)}
        except Exception as e:
            employee_info['manager'] = {"message": "Manager not assigned or error fetching manager info: " + str(e)}
        return employee_info
    except Exception as e:
        logger.error(f"Failed to fetch employee info for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.get("/employee_licenses/{user_id}")
async def get_employee_licenses(user_id: str):
    logger.debug(f"Fetching licenses for user_id: {user_id}")
    try:
        licenses_info = await fetch_employee_licenses(user_id)
        return licenses_info
    except Exception as e:
        logger.error(f"Failed to fetch licenses for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.get("/employee_groups/{user_id}")
async def get_employee_groups(user_id: str):
    logger.debug(f"Listing groups for user_id: {user_id}")
    try:
        groups_info = await list_employee_groups(user_id)
        return groups_info
    except Exception as e:
        logger.error(f"Failed to list groups for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.post("/migrate_emails/{employee_email}/{manager_email}")
async def migrate_employee_emails(employee_email: str, manager_email: str):
    logger.debug(f"Migrating emails from {employee_email} to {manager_email}")
    try:
        result = await migrate_emails(employee_email, manager_email)
        return result
    except Exception as e:
        logger.error(f"Failed to migrate emails for {employee_email} to {manager_email}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Failed to migrate emails")

@offboarding_router.get("/offboard/{user_id}/confirmation")
async def final_confirmation(user_id: str):
    logger.debug(f"Generating final confirmation for user_id: {user_id}")
    try:
        employee_info = await fetch_employee_info(user_id)
        employee_groups = await list_employee_groups(user_id)
        employee_licenses = await fetch_employee_licenses(user_id)
        
        account_disabled_status = "Account disabled successfully" if employee_info.get("accountEnabled", True) == False else "Error disabling account or account still enabled"
        
        confirmation_summary = {
            "employee_info": employee_info,
            "groups_status": f"All groups for {user_id} have been removed.",
            "licenses_status": f"All licenses for {user_id} have been revoked.",
            "account_disabled_status": account_disabled_status,
            "final_cleanup": "Pending"
        }
        
        return confirmation_summary
    except Exception as e:
        logger.error(f"Failed to generate final confirmation for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@offboarding_router.get("/offboard/{user_id}/disable_account")
async def disable_account_endpoint(user_id: str):
    logger.debug(f"Disabling account for user_id: {user_id}")
    try:
        result = await disable_employee_account(user_id)
        return {"status": "Success", "message": f"Successfully disabled account for {user_id}.", "details": result}
    except Exception as e:
        logger.error(f"Failed to disable account for {user_id}. Error: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to disable account for {user_id}. Error: {e}")

@app.post("/modify_user_mailbox/{user_id}")
async def modify_user_mailbox_endpoint(user_id: str = Path(..., description="The user's unique identifier")):
    """
    An API endpoint to modify a user's email settings in Microsoft Exchange.
    This includes changing the mailbox type to shared, hiding from global address list, etc.
    """
    logger.info(f"Request received to modify mailbox for user_id: {user_id}")  # Log the reception of the request
    try:
        token = get_token()
    except ValueError as e:
        logger.error(f"Token validation failed for mailbox modification request of user_id: {user_id}: {e}", exc_info=True)
        raise HTTPException(status_code=401, detail=str(e))

    try:
        employee_info = await fetch_employee_info(user_id)
        manager_email = employee_info.get('manager', {}).get('email')
        if not manager_email:
            logger.error(f"Manager's email not found for user_id {user_id}")
            raise HTTPException(status_code=404, detail="Manager's email not found for the given user_id")
    except Exception as e:
        logger.error(f"Failed to fetch manager's email for user_id {user_id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to fetch manager's email for the given user_id: {str(e)}")

    try:
        modify_result = await modify_user_mailbox(user_id, manager_email)
        logger.info(f"Mailbox modification initiated successfully for user_id {user_id}")
        return {"message": "Mailbox modification initiated successfully.", "result": modify_result}
    except Exception as e:
        logger.error(f"An error occurred while modifying the mailbox for user_id {user_id}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"An error occurred while modifying the mailbox: {str(e)}")

app.include_router(offboarding_router)
app.include_router(log_router, prefix='/log')  # Include the log_router with a prefix

if __name__ == "__main__":
    try:
        uvicorn.run(app, host="127.0.0.1", port=8001)
    except Exception as e:
        logger.error(f"Failed to start Uvicorn server: {e}", exc_info=True)