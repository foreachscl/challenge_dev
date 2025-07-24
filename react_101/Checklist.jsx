import React, { useState } from "react";

export default function Checklist() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  // Agregar nueva tarea
  const handleAdd = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
    setInput("");
  };

  // Marcar como completada
  const toggleTask = (id) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Contar tareas pendientes
  const pendientes = tasks.filter(t => !t.completed).length;

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
      <div>Tareas pendientes: {pendientes}</div>
    </div>
  );
}