from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    completed: bool = False

class TaskCreate(TaskBase):
    pass

class TaskResponse(TaskBase):
    id: int

    model_config = {
        "from_attributes": True
    }

from pydantic import BaseModel, EmailStr


# 🔹 Criar usuário (entrada)
class UserCreate(BaseModel):
    email: EmailStr
    password: str


# 🔹 Retornar usuário (saída)
class UserResponse(BaseModel):
    id: int
    email: EmailStr

    class Config:
        from_attributes = True
