from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers.tasks import router as tasks_router
from app.routers.auth import router as auth_router


app = FastAPI()

# 🔥 CORS (liberar acesso do frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔥 Criar tabelas no banco
Base.metadata.create_all(bind=engine)

# 🔥 Rotas


app.include_router(tasks_router, prefix="/tasks", tags=["Tasks"])
app.include_router(auth_router, tags=["Auth"])
