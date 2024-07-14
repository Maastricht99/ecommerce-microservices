from passlib.context import CryptContext
import config
import jwt

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def is_password_valid(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

def get_hashed_password(password: str):
    return pwd_context.hash(password)

def generate_token(user_id: str, role: str):
    payload = { "user_id": user_id, "role": role }
    return jwt.encode(payload, config.JWT_SECRET, algorithm=config.JWT_ALGORITHM)

def decode_token(token: str):
    return jwt.decode(token, config.JWT_SECRET, algorithms=[config.JWT_ALGORITHM])