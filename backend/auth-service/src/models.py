from sqlalchemy import Column, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base
import uuid
from db import db_dependency

Base = declarative_base()

class User(Base):
    __tablename__ = "users"
    
    id = Column(UUID(as_uuid=True), default=uuid.uuid4, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String)
    
def add_user(new_user: User, db: db_dependency):
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
def get_user_by_username(username: str, db: db_dependency):
    return db.query(User).filter(User.username == username).first()

