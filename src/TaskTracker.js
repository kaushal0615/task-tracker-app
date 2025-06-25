import React, { useState, useEffect } from "react";

const TaskTracker = () => {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      timestamp: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
    setTitle("");
    setDescription("");
    setError("");
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "auto" }}>
      <h2>Task Tracker</h2>

      <form onSubmit={addTask} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "100%" }}
        ></textarea>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button type="submit">Add Task</button>
      </form>

      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      {filteredTasks.length === 0 ? (
        <p>No tasks to display.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {filteredTasks.map((task) => (
            <li
              key={task.id}
              style={{
                border: "1px solid #ccc",
                padding: "0.5rem",
                marginBottom: "0.5rem",
                background: task.completed ? "#e0ffe0" : "#fff",
              }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
              />
              <strong style={{ marginLeft: "0.5rem" }}>{task.title}</strong>
              <p>{task.description}</p>
              <small>{new Date(task.timestamp).toLocaleString()}</small>
              <div>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskTracker;
