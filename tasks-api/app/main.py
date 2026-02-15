from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import tasks

app = FastAPI()

# 🔥 CONFIGURAÇÃO CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# cria tabelas
Base.metadata.create_all(bind=engine)

# inclui rotas
app.include_router(tasks.router)
