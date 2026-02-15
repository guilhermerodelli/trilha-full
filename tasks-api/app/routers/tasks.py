from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app import models, schemas

router = APIRouter(prefix="/tasks", tags=["tasks"])

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.TaskResponse)
def create_task(task: schemas.TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(title=task.title)
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@router.get("/", response_model=list[schemas.TaskResponse])
def list_tasks(db: Session = Depends(get_db)):
    return db.query(models.Task).all()

@router.delete("/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    db.delete(task)
    db.commit()

    return {"message": "Task deleted"}

@router.put("/{task_id}", response_model=schemas.TaskResponse)
def update_task(task_id: int, task: schemas.TaskBase, db: Session = Depends(get_db)):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()

    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")

    db_task.title = task.title
    db_task.completed = task.completed

    db.commit()
    db.refresh(db_task)

    return db_task
