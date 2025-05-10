from app.crud.base import CRUDBase
from app.models.blog import Post
from app.schemas.post import PostCreate, PostUpdate
from sqlalchemy.orm import joinedload

class CRUDPost(CRUDBase[Post, PostCreate, PostUpdate]):
    pass

post = CRUDPost(Post)
