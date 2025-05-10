from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud.post import post
from app.schemas.post import PostCreate, PostResponse, PostUpdate
from typing import List

router = APIRouter()

@router.post("/posts", response_model=PostResponse)
def create_post(post_in: PostCreate, db: Session = Depends(get_db)):
    return post.create(db=db, obj_in=post_in)

@router.get("/posts/{post_id}", response_model=PostResponse)
def get_post(post_id: int, db: Session = Depends(get_db)):
    db_post = post.get(db=db, id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return db_post

@router.get("/posts", response_model=List[PostResponse])
def get_multi_post(skip: int = 0, limit:int = 100, db:Session = Depends(get_db)):
    db_multi_post = post.get_multi(db=db, skip=skip, limit=limit)
    return db_multi_post or []

@router.put("/posts/{post_id}", response_model=PostResponse)
def update_post(post_id: int, post_in:PostUpdate, db:Session = Depends(get_db)):
    db_post = post.get(db=db, id=post_id)
    if db_post is None:
        raise HTTPException(status_code=404, detail="Can't update because Post not found")
    return post.update(db=db, db_obj=db_post, obj_in=post_in)

@router.delete("/posts/{post_id}", response_model=PostResponse)
def delete_post(post_id: int, db:Session=Depends(get_db)):
    db_delete = post.get(db=db, id=post_id)
    if db_delete is None:
        raise HTTPException(status_code=404, detail="Post not found")
    
    return post.delete(db=db, id=post_id)
