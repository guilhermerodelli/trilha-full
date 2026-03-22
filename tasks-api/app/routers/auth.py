from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas

from app.utils.security import hash_password
from app.utils.security import verify_password



router = APIRouter()


# 🔹 Dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 Rota de cadastro
@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")

    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Senha inválida")

    return {"message": "Login realizado com sucesso"}

 
    