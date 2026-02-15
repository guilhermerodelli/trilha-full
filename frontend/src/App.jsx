import { useEffect, useState } from 'react'
import { api } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')


  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/')
      setTasks(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  
  const addTask = async () => {
    if (!title) return

    try {
      await api.post('/tasks/', { title })
      setTitle('')
      fetchTasks()
    } catch (error) {
      console.error("Erro ao criar:", error.response?.data || error)
    }
  }

  
  const removeTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`)
      fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  
  const toggleTask = async (task) => {
    try {
      await api.put(`/tasks/${task.id}`, {
        title: task.title,
        completed: !task.completed
      })
      fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Tasks Front</h1>

      <input
        placeholder="Nova tarefa"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />

      <button onClick={addTask}>Adicionar</button>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task)}
            />
            <span
              style={{
                textDecoration: task.completed ? 'line-through' : 'none',
                marginLeft: 8
              }}
            >
              {task.title}
            </span>
            <button
              onClick={() => removeTask(task.id)}
              style={{ marginLeft: 10 }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
