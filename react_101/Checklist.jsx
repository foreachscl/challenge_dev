import React, { useState } from "react";

export default function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Agregar nueva tarea
  const handleAdd = (e) => {

  };

  // Marcar como completada
  const toggleTask = (id) => {

  };


  return (
    <div>
      <h1>Contador de Tareas Pendientes</h1>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <label style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
      <div>Tareas pendientes: {tasks.length}</div>
    </div>
  );
}