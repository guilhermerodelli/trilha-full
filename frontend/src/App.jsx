import { useEffect, useState } from 'react'
import { api } from './services/api'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    api.get('/tasks')
      .then(response => setTasks(response.data))
      .catch(err => console.error(err))
  }, [])

  function addTask() {
    if (!title) return

    api.post('/tasks', { title })
      .then(response => {
        setTasks([...tasks, response.data])
        setTitle('')
      })
  }

  function removeTask(index) {
    api.delete(`/tasks/${index}`)
      .then(() => {
        setTasks(tasks.filter((_, i) => i !== index))
      })
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
        {tasks.map((task, index) => (
          <li key={index}>
            {task.title}
            <button onClick={() => removeTask(index)}> ❌</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
