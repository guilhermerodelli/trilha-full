from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import models, schemas
from app.utils.security import hash_password, verify_password

router = APIRouter()


# 🔹 Dependência do banco
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 🔹 Rota de cadastro
@router.post("/register", response_model=schemas.UserResponse)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    
    # Verificar se já existe usuário
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email já cadastrado")

    # Criar usuário com senha criptografada
    new_user = models.User(
        email=user.email,
        password=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


# 🔹 Rota de login
@router.post("/login")
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):

    # Buscar usuário
    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Usuário não encontrado")

    # Validar senha
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Senha inválida")

    return {"message": "Login realizado com sucesso"}
