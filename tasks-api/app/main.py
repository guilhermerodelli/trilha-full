from fastapi import FastAPI, HTTPException
from typing import List
from app.models import Task

app = FastAPI(title="Tasks API")

tasks: List[Task] = []

@app.post("/tasks", status_code=201)
def create_task(task: Task):
    tasks.append(task)
    return task

@app.get("/tasks", response_model=List[Task])
def list_tasks():
    return tasks

@app.put("/tasks/{task_id}")
def update_task(task_id: int, task: Task):
    if task_id >= len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")
    tasks[task_id] = task
    return task

@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int):
    if task_id >= len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")
    tasks.pop(task_id)
