from fastapi import APIRouter, HTTPException
from starlette.responses import StreamingResponse
from typing import List
import os
import logging
import aiofiles

log_router = APIRouter()

# Set up logging
logger = logging.getLogger("msgraph-backend")
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

@log_router.get("/logs", response_model=List[str])
async def list_log_files():
    try:
        logger.info("Fetching list of log files.")
        log_files = [file for file in os.listdir('.') if file.endswith('.log')]
        return log_files
    except Exception as e:
        logger.error("Error fetching log files: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="Error fetching log files")

@log_router.get("/logs/{filename}", response_model=str)
async def read_log_file(filename: str):
    log_file_path = f"./{filename}"
    if not os.path.exists(log_file_path):
        logger.error(f"Log file not found: {filename}")
        raise HTTPException(status_code=404, detail="Log file not found")
    if not log_file_path.endswith('.log'):
        logger.error(f"Invalid file type requested: {filename}")
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    try:
        async with aiofiles.open(log_file_path, mode='r') as file:
            content = await file.read()
        logger.info(f"Successfully read log file: {filename}")
        return content
    except Exception as e:
        logger.error(f"Error reading log file {filename}: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail="Error reading log file")

@log_router.get("/logs/download/{filename}")
async def download_log_file(filename: str):
    log_file_path = f"./{filename}"
    if not os.path.exists(log_file_path):
        logger.error(f"Log file not found: {filename}")
        raise HTTPException(status_code=404, detail="Log file not found")
    if not log_file_path.endswith('.log'):
        logger.error(f"Invalid file type requested: {filename}")
        raise HTTPException(status_code=400, detail="Invalid file type")
    
    def file_iterator(file_path, chunk_size=4096):
        try:
            with open(file_path, mode='rb') as file:
                while chunk := file.read(chunk_size):
                    yield chunk
        except Exception as e:
            logger.error(f"Failed to stream log file {filename}: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail=f"Failed to stream log file: {filename}")

    logger.info(f"Preparing to stream download log file: {filename}")
    return StreamingResponse(file_iterator(log_file_path), media_type='application/octet-stream')