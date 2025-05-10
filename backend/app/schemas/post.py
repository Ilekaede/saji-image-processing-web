from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional
from .user import UserResponse

class PostBase(BaseModel):
    title:str = Field(..., min_length=1, max_length=100)
    content:str = Field(..., min_length=1, max_length=1000)

# 記事作成用のモデル
class PostCreate(PostBase):
    author_id: int

# 記事更新用のモデル
class PostUpdate(BaseModel):
    title:Optional[str] = Field(None, min_length=1, max_length=100)
    content:Optional[str] = Field(None, min_length=1, max_length=1000)

# APIレスポンス用のモデル
class PostResponse(PostBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None
    author_id: int
    author: Optional[UserResponse] = None
    
    class Config:
        from_attributes = True
        populate_by_name = True

