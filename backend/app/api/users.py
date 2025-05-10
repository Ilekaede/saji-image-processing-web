from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.crud.user import user
from app.schemas.user import UserCreate, UserResponse, UserUpdate
from typing import List

router = APIRouter()

@router.post("/users", response_model=UserResponse)
def create_user(user_in:UserCreate, db: Session = Depends(get_db)):
    return user.create(db=db, obj_in=user_in)

@router.get('/users/{user_id}', response_model=UserResponse)
def get_user(user_id:int, db:Session = Depends(get_db)):
    db_user = user.get(db=db, id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail='User not found')
    return db_user

@router.get("/users", response_model=List[UserResponse])
def get_multi_user(skip: int = 0, limit:int = 100, db:Session = Depends(get_db)):
    db_multi_user = user.get_multi(db=db, skip=skip, limit=limit)
    return db_multi_user or []

@router.put("/users/{user_id}", response_model=UserResponse)
def update_user(user_id: int, user_in:UserUpdate, db:Session = Depends(get_db)):
    db_user = user.get(db=db, id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="Can't update because User not found")
    return user.update(db=db, db_obj=db_user, obj_in=user_in)

@router.delete("/users/{user_id}", response_model=UserResponse)
def delete_user(user_id: int, db:Session=Depends(get_db)):
    db_delete = user.get(db=db, id=user_id)
    if db_delete is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    return user.delete(db=db, id=user_id)
