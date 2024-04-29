from fastapi import FastAPI, Depends, HTTPException, status, Security, Request
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
import logging
from datetime import timedelta
from auth import authenticate_user, create_access_token, get_current_active_user, User
from graph_api import fetch_employee_info, list_employee_groups, fetch_employee_licenses, remove_from_groups, revoke_licenses, migrate_email, archive_employee_data, validate_removal_operations

app = FastAPI()

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Security
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"  # INPUT_REQUIRED {Replace with your secret key}
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173","*"],  # Adjust according to your frontend's address
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    logger.info("Generating access token")
    try:
        user = authenticate_user(form_data.username, form_data.password)
        if not user:
            logger.warning("Authentication failed: Incorrect username or password")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect username or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
        access_token = create_access_token(
            data={"sub": user.username}, expires_delta=access_token_expires
        )
        logger.info("Access token generated successfully")
        return {"access_token": access_token, "token_type": "bearer"}
    except Exception as e:
        logger.error(f"Error generating access token - {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to generate access token")

@app.get("/")
async def root():
    logger.info("Root endpoint called")
    return {"message": "Hello World"}

@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

@app.get("/employee/{user_id}")
async def get_employee_info_route(user_id: str):
    try:
        logger.info(f"Fetching information for user ID: {user_id}")
        employee_info = fetch_employee_info(user_id)
        employee_groups = list_employee_groups(user_id)
        employee_licenses = fetch_employee_licenses(user_id)
        response = {
            "employeeDetails": {
                "id": employee_info.get('id'),
                "name": employee_info.get('name'),
                "email": employee_info.get('email'),
                "position": employee_info.get('position'),
                "creationDate": employee_info.get('creationDate'),
                "employeeType": employee_info.get('employeeType'),
                "manager": employee_info.get('manager'),
                "accountStatus": employee_info.get('accountStatus'),
                "city" : employee_info.get('city'),
                "officeLocation": employee_info.get('officeLocation'),
                "country" : employee_info.get("country"),                
                "employeeId" : employee_info.get("employeeId"),
                "department" : employee_info.get("department")
                

            },
            "groups": employee_groups,
            "licenses": employee_licenses
        }
        return response
    except Exception as e:
        logger.error(f"Error fetching employee information for user ID: {user_id} - {e}", exc_info=True)
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/offboard/{user_id}")
async def offboard_employee(user_id: str, token : Request):
    try:
        logger.info(f"Initiating offboarding for user ID: {user_id}")
        print("token;",token.headers.get("Authorization"))
        access_token=token.headers.get("Authorization")
        removed_groups = remove_from_groups(user_id, access_token)
        revoked_licenses = revoke_licenses(user_id, access_token)
        #email_migration_status = migrate_email(user_id, "manager_user_id")  # manager_user_id should be dynamically determined or passed

        # Validate removal operations
        validation_results = validate_removal_operations(user_id)
        if validation_results['remainingGroups'] or validation_results['remainingLicenses']:
            logger.error(f"Offboarding process could not be fully completed for user ID: {user_id}. Remaining associations found.")
            return {
                "message": "Offboarding process incomplete. Remaining associations found.",
                "remaining_groups": validation_results['remainingGroups'],
                "remaining_licenses": validation_results['remainingLicenses'],
                "email_migration_status": email_migration_status
            }

        logger.info("Offboarding process completed successfully")
        return {
            "message": "Offboarding process completed.",
            "removed_groups": removed_groups,
            "revoked_licenses": revoked_licenses,
            "email_migration_status": email_migration_status
        }
    except Exception as e:
        logger.error(f"Error initiating offboarding for user ID: {user_id} - {e}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to initiate offboarding process")

@app.post("/archive/{user_id}")
async def archive_employee(user_id: str, current_user: User = Security(get_current_active_user)):
    """
    Archive data of an employee identified by 'user_id'.
    This endpoint is accessible only by authenticated users.
    """
    try:
        logger.info(f"Initiating archiving for user ID: {user_id}")
        archive_status = archive_employee_data(user_id)
        logger.info("Archiving process completed successfully")
        return {"message": "Archiving process completed successfully.", "archive_status": archive_status}
    except Exception as e:
        logger.error(f"Error initiating archiving for user ID: {user_id} - {e}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to initiate archiving process")

@app.post("/feedback")
async def receive_feedback(request: Request):
    """
    Endpoint to receive feedback from users.
    """
    try:
        feedback_data = await request.json()
        logger.info(f"Received feedback: {feedback_data}")
        # Here you would typically save the feedback data to a database or a file for further processing.
        logger.info("Feedback received successfully")
        return JSONResponse(status_code=status.HTTP_201_CREATED, content={"message": "Feedback received successfully."})
    except Exception as e:
        logger.error(f"Error receiving feedback - {e}", exc_info=True)
        return JSONResponse(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, content={"message": "Failed to receive feedback."})

@app.get("/offboard/summary/{user_id}")
async def get_offboard_summary(user_id: str):
    try:
        # Assume validate_removal_operations returns a detailed summary
        summary = validate_removal_operations(user_id)
        logger.info(f"Fetching offboarding summary for user ID: {user_id}")
        return summary
    except Exception as e:
        logger.error(f"Error fetching offboarding summary for user ID: {user_id} - {e}", exc_info=True)
        raise HTTPException(status_code=400, detail="Failed to fetch offboarding summary")