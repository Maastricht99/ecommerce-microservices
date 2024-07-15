from passlib.context import CryptContext
from fastapi import Request
import config
import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def is_password_valid(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def get_hashed_password(password: str):
    return pwd_context.hash(password)

def generate_token(user_id: str, role: str):
    payload = { "user_id": user_id, "role": role }
    try:
        return jwt.encode(payload, config.JWT_SECRET, algorithm=config.JWT_ALGORITHM)
    except Exception as e:
        raise Exception("Error generating token:", e)

def decode_token(token: str):
    try:
        return jwt.decode(token, config.JWT_SECRET, algorithms=[config.JWT_ALGORITHM])
    except Exception as e:
        raise Exception("Error decoding token:", e)
    
def extract_token_from_headers(request: Request) -> str | None:
    auth_header = request.headers.get("Authorization")
    if auth_header is None or not auth_header.startswith("Bearer "):
        return None
    token = auth_header.split(" ")[1]
    return token