"use client";

import { useState } from "react";

export default function CustomerPage() {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleAddTask = () => {
    if (taskName.trim() === "") {
      // Don't add task if taskName is empty or whitespace
      return;
    }
    // Add task with provided name
    const newTask = {
      employee: selectedEmployee,
      taskName: taskName,
      status: "Pending",
    };
    setTasks([...tasks, newTask]);
    // Clear taskName field after adding task
    setTaskName("");
  };

  const handleTaskStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="wrapper">
      <select
        id="employee-select"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(e.target.value)}
        style={{ marginBottom: "10px" }}
      >
        <option value="">Select Employee</option>
        <option value="John Doe">John Doe</option>
        <option value="Jane Smith">Jane Smith</option>
      </select>

      <div
        className="task-input"
        style={{ marginTop: "20px", marginBottom: "10px" }}
      >
        <input
          type="text"
          placeholder="Add a new task"
          style={{ padding: "5px" }}
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>

      <div className="controls" style={{ marginBottom: "10px" }}>
        <div className="filters">
          <span className="active" style={{ marginRight: "10px" }}>
            All
          </span>
          <span style={{ marginRight: "10px" }}>Pending</span>
          <span>Completed</span>
        </div>
        <button
          className="clear-btn"
          style={{
            marginLeft: "10px",
            padding: "5px 10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
      </div>

      <ul className="task-box">
        {tasks.map((task, index) => (
          <li key={index}>
            <span>{task.taskName}</span>
            <span>{task.status}</span>
            <button onClick={() => handleTaskStatusChange(index, "Pending")}>
              Mark as Pending
            </button>
            <button onClick={() => handleTaskStatusChange(index, "Completed")}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleLogout}
        style={{
          padding: "5px 10px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Log Out
      </button>
    </div>
  );
}
