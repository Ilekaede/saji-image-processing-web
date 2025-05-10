from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import posts, users
from app.core.database import engine
from app.models import blog

# データベーステーブルの作成
blog.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Blog API")

# CORSの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # ReactアプリケーションのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの登録
app.include_router(posts.router, prefix="/api/v1", tags=["posts"])
app.include_router(users.router, prefix="/api/v1", tags=["users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to Blog API"}