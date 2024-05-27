"use client";

import { useEffect, useState } from "react";
import "./employee.css";
import NavBar from "../../components/NavBar";

export default function EmployeePage() {
  const [tasks, setTasks] = useState([]);
  const [employeeTasks, setEmployeeTasks] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/task");
        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("API response is not an array");
        }
        const tasksByEmployee = data.reduce((acc, task) => {
          const employeeName = task.employeeName;
          if (!acc[employeeName]) {
            acc[employeeName] = [];
          }
          acc[employeeName].push(task);
          return acc;
        }, {});
        setEmployeeTasks(tasksByEmployee);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEmployeeChange = (employeeName) => {
    setSelectedEmployee(employeeName);
    setTasks(employeeTasks[employeeName] || []);
  };

  const handleTaskStatusChange = async (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.taskID === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setEmployeeTasks({
      ...employeeTasks,
      [selectedEmployee]: updatedTasks,
    });

    try {
      const response = await fetch(`../api/task/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="wrapper">
      <NavBar />
      <h2 style={{ marginBottom: "20px" }}>Tasks</h2>
      <div className="employee-selector">
        <select onChange={(e) => handleEmployeeChange(e.target.value)}>
          <option value="">Select Employee</option>
          {Object.keys(employeeTasks).map((employee) => (
            <option key={employee} value={employee}>
              {employee}
            </option>
          ))}
        </select>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.taskID}>
            <span>{task.customer}</span>
            <span>{task.taskName}</span>
            <span style={{ textTransform: "capitalize" }}>{task.status}</span>
            {task.status === "Pending" && (
              <button
                className="mark-completed"
                onClick={() => handleTaskStatusChange(task.taskID, "Completed")}
              >
                Mark as Completed
              </button>
            )}
            {task.status === "Completed" && (
              <button
                className="mark-pending"
                onClick={() => handleTaskStatusChange(task.taskID, "Pending")}
              >
                Mark as Pending
              </button>
            )}
          </li>
        ))}
      </ul>
      <button className="logout-button">
        <a href="../login" className="logout-link">
          Log Out
        </a>
      </button>
    </div>
  );
}
