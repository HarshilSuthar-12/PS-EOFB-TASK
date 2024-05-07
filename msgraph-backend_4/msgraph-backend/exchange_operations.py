import subprocess
import asyncio
from logger import setup_logger

logger = setup_logger(__name__)

async def modify_user_mailbox(user_id: str, manager_email: str):
    """
    Asynchronously executes the ModifyUserMailbox.ps1 PowerShell script to modify a user's mailbox settings.
    Args:
        user_id (str): The user's identifier (email or ID).
        manager_email (str): The email address of the user's manager.
    """
    logger.info(f"Starting mailbox modification for user_id: {user_id}")  # Log the start of the process
    try:
        # Constructing the PowerShell command
        ps_script_path = "./ModifyUserMailbox.ps1"  # INPUT_REQUIRED {Provide the correct path to the ModifyUserMailbox.ps1 script if different}
        command = ["powershell", "-ExecutionPolicy", "Unrestricted", "-File", ps_script_path, "-UserId", user_id, "-ManagerEmail", manager_email]
        
        # Asynchronously executing the PowerShell script
        process = await asyncio.create_subprocess_exec(*command, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        stdout, stderr = await process.communicate()
        
        if stderr:
            error_message = stderr.decode()
            logger.error(f"Error modifying user mailbox for {user_id}: {error_message}")
            return {"error": error_message}
        else:
            output_message = stdout.decode()
            logger.info(f"Successfully modified user mailbox for {user_id}. Output: {output_message}")
            return {"message": output_message}
    except Exception as e:
        logger.exception(f"An exception occurred while modifying user mailbox for {user_id}: {str(e)}", exc_info=True)
        return {"error": str(e)}
    finally:
        logger.info(f"Mailbox modification process completed for user_id: {user_id}")  # Log completion of the process