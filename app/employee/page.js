"use client";

import { useEffect, useState } from "react";
import "./employee.css";
import NavBar from "../../components/NavBar"

export default function EmployeePage() {
  const [tasks, setTasks] = useState([]);
  const [employeeTasks, setEmployeeTasks] = useState({});
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setEmployeeTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleEmployeeChange = (employeeName) => {
    setSelectedEmployee(employeeName);
    setTasks(employeeTasks[employeeName] || []);
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.taskID === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setEmployeeTasks({
      ...employeeTasks,
      [selectedEmployee]: updatedTasks,
    });
  };

  return (
    <div className="wrapper">
      <NavBar/>
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
