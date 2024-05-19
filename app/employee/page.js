"use client";

import { useEffect, useState } from "react";

export default function EmployeePage() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks data from an API or any other source
    // For demonstration, I'll use static data here
    const sampleTasks = [
      { id: 1, customer: "John Doe", taskName: "Task 1", status: "Pending" },
      {
        id: 2,
        customer: "Jane Smith",
        taskName: "Task 2",
        status: "Completed",
      },
      // Add more tasks as needed
    ];
    setTasks(sampleTasks);
  }, []);

  const handleTaskStatusChange = (taskId, newStatus) => {
    // Update the status of the task with the provided taskId
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="wrapper">
      <h2 style={{ marginBottom: "20px" }}>Tasks</h2>
      <ul className="task-list">
        {tasks.map((task) => (
          <li
            key={task.id}
            style={{
              marginBottom: "10px",
              padding: "10px",
              backgroundColor: "#f4f4f4",
              borderRadius: "5px",
            }}
          >
            <span style={{ marginRight: "20px" }}>{task.customer}</span>
            <span style={{ marginRight: "20px" }}>{task.taskName}</span>
            <span style={{ marginRight: "20px", textTransform: "capitalize" }}>
              {task.status}
            </span>
            {/* Button to change task status */}
            {task.status === "Pending" && (
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => handleTaskStatusChange(task.id, "Completed")}
              >
                Mark as Completed
              </button>
            )}
            {task.status === "Completed" && (
              <button
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
                onClick={() => handleTaskStatusChange(task.id, "Pending")}
              >
                Mark as Pending
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
