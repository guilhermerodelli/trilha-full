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
    if (!title.trim()) return

    try {
      await api.post('/tasks/', { title })
      setTitle('')
      fetchTasks()
    } catch (error) {
      console.error(error)
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastre aqui</h1>

        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            placeholder="Digite sua tarefa..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <button style={styles.button} onClick={addTask}>
            +
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((task) => (
            <li key={task.id} style={styles.task}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task)}
              />

              <span
                style={{
                  ...styles.taskText,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  opacity: task.completed ? 0.5 : 1
                }}
              >
                {task.title}
              </span>

              <button
                style={styles.deleteButton}
                onClick={() => removeTask(task.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#0f0f0f',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial'
  },

  card: {
    width: '100%',
    maxWidth: '450px',
    backgroundColor: '#1a1a1a',
    padding: '25px',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(0,0,0,0.5)'
  },

  title: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: '20px'
  },

  inputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px'
  },

  input: {
    flex: 1,
    padding: '12px',
    borderRadius: '10px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#2a2a2a',
    color: '#fff'
  },

  button: {
    padding: '12px 16px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#00c853',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer'
  },

  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },

  task: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px',
    borderBottom: '1px solid #333'
  },

  taskText: {
    flex: 1,
    marginLeft: '10px',
    color: '#fff'
  },

  deleteButton: {
    background: 'transparent',
    border: 'none',
    color: '#ff5252',
    cursor: 'pointer',
    fontSize: '16px'
  }
}

export default App
