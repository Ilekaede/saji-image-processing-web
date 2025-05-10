from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

class UserBase(BaseModel):
    username:str = Field(..., min_length=3, max_length=20)
    email:EmailStr

class UserCreate(UserBase): # パスワードはアカウント作成時のみでよい
    password:str = Field(..., min_length=8)

class UserUpdate(BaseModel):
    username:Optional[str] = Field(None, min_length=3, max_length=20)
    email:Optional[EmailStr] = None
    password:str = Field(None, min_length=8)
    icon_url:Optional[str] = None

class UserResponse(UserBase):
    id:int
    icon_url: Optional[str] = None # 画像のurlを保存
    created_at:datetime
    updated_at:Optional[datetime]

    class Config:
        from_attributes = True