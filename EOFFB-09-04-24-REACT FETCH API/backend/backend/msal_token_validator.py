import os
from typing import Optional
from jose import jwt, JWTError
from fastapi import HTTPException, status, Depends
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel
import aiohttp
import logging
from dotenv import load_dotenv

load_dotenv()

# Environment Variables
CLIENT_ID = os.getenv("CLIENT_ID")  # INPUT_REQUIRED {Replace YOUR_CLIENT_ID with your actual application (client) ID from Azure AD.}
TENANT_ID = os.getenv("TENANT_ID")  # INPUT_REQUIRED {Replace YOUR_TENANT_ID with your Azure AD tenant ID.}
AUTHORITY = os.getenv("AUTHORITY")  # INPUT_REQUIRED {Replace YOUR_TENANT_ID in the URL with your Azure AD tenant ID.}

# Setup logger
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{AUTHORITY}/oauth2/v2.0/token")

class TokenData(BaseModel):
    iss: str
    sub: str
    aud: str
    iat: int
    exp: int
    nbf: Optional[int] = None
    roles: Optional[list] = None

async def validate_token(token: str = Depends(oauth2_scheme)):
    """
    Validate JWT token and return user data if the token is valid.
    """
    if not token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated")
    
    try:
        # Decode token without verification
        unverified_header = jwt.get_unverified_header(token)
        unverified_claims = jwt.get_unverified_claims(token)

        # Obtain the JWKs from Microsoft login endpoint
        async with aiohttp.ClientSession() as session:
            async with session.get(f"{AUTHORITY}/discovery/v2.0/keys") as response:
                if response.status != 200:
                    logger.error("Failed to fetch JWKs for token validation")
                    raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to fetch JWKs for token validation")
                jwks = await response.json()
        
        # Verify the token
        rsa_key = {}
        for key in jwks["keys"]:
            if key["kid"] == unverified_header["kid"]:
                rsa_key = {
                    "kty": key["kty"],
                    "kid": key["kid"],
                    "use": key["use"],
                    "n": key["n"],
                    "e": key["e"]
                }
        if rsa_key:
            payload = jwt.decode(
                token,
                rsa_key,
                algorithms=["RS256"],
                audience=CLIENT_ID,
                issuer=f"{AUTHORITY}/v2.0"
            )
            logger.info("Token successfully validated")
            return payload  # Return the validated token payload
    except JWTError as e:
        logger.error(f"JWT Error: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")
    except Exception as e:
        logger.error(f"Unexpected error during token validation: {e}", exc_info=True)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unexpected error during token validation")

    raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Could not validate credentials")