from app.crud.base import CRUDBase
from app.models.blog import User
from app.schemas.user import UserCreate, UserUpdate

class CRUDUser(CRUDBase[User, UserCreate, UserUpdate]):
    pass

user = CRUDUser(User)


