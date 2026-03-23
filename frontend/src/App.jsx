import { useState } from "react";
import api from "./services/api";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleAddTask() {
    if (!task) return;

    try {
      const response = await api.post("/tasks", {
        title: task,
      });

      setTasks([...tasks, response.data]);
      setTask("");
    } catch (error) {
      alert("Erro ao adicionar tarefa");
    }
  }

  async function handleLogin() {
    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      alert(response.data.message);
    } catch (error) {
      alert("Erro no login");
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Cadastre aqui</h1>

        {/* LOGIN */}
        <input
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.loginButton} onClick={handleLogin}>
          Entrar
        </button>

        {/* TASK */}
        <div style={styles.taskContainer}>
          <input
            style={styles.input}
            placeholder="Digite sua tarefa..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <button style={styles.addButton} onClick={handleAddTask}>
            +
          </button>
        </div>

        <ul style={styles.list}>
          {tasks.map((t, index) => (
            <li key={index}>{t.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    background: "#111",
    padding: "30px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 0 30px rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "24px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "none",
    background: "#222",
    color: "#fff",
    outline: "none",
  },
  loginButton: {
    width: "100%",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  taskContainer: {
    display: "flex",
    gap: "10px",
  },
  addButton: {
    padding: "10px 15px",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    cursor: "pointer",
  },
  list: {
    marginTop: "20px",
    color: "#fff",
    listStyle: "none",
    padding: 0,
  },
};

export default App;
