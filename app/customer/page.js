"use client";
import { useState } from "react";
import './customer.css';

const employees = [
  { name: "John Doe", position: "Manager", email: "john.doe@example.com" },
  { name: "Jane Smith", position: "Developer", email: "jane.smith@example.com" },
];

export default function CustomerPage() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  const handleAddTask = () => {
    if (!selectedEmployee) {
      alert("Please select an employee before adding a task!");
      return;
    }
    if (taskName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }
    const newTask = {
      employee: selectedEmployee.name,
      taskName: taskName,
      status: "Pending",
    };
    setTasks([...tasks, newTask]);
    setTaskName("");
  };

  const handleTaskStatusChange = (index, newStatus) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].status = newStatus;
    setTasks(updatedTasks);
  };

  const handleLogout = () => {
    if (tasks.length > 0) {
      alert("Please clear all tasks before logging out!");
      return;
    }
    window.location.href = "../login";
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") return true;
    return task.status === filter;
  });

  return (
    <div className="wrapper">
      {!selectedEmployee ? (
        <div className="employee-list">
          <h3>Select an Employee</h3>
          {employees.map((employee) => (
            <div key={employee.name} className="employee-card" onClick={() => setSelectedEmployee(employee)}>
              <p><strong>Name:</strong> {employee.name}</p>
              <p><strong>Position:</strong> {employee.position}</p>
              <p><strong>Email:</strong> {employee.email}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="employee-info">
            <h3>Employee Information</h3>
            <p><strong>Name:</strong> {selectedEmployee.name}</p>
            <p><strong>Position:</strong> {selectedEmployee.position}</p>
            <p><strong>Email:</strong> {selectedEmployee.email}</p>
            <button className="back-button" onClick={() => setSelectedEmployee(null)}>
              Back to Employee List
            </button>
          </div>

          <div className="task-input">
            <input
              type="text"
              placeholder="Add a new task"
              className="input"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <button onClick={handleAddTask} className="add-button">
              Add Task
            </button>
          </div>

          <div className="controls">
            <div className="filters">
              <span
                className={filter === "All" ? "active" : ""}
                onClick={() => setFilter("All")}
              >
                All
              </span>
              <span
                className={filter === "Pending" ? "active" : ""}
                onClick={() => setFilter("Pending")}
              >
                Pending
              </span>
              <span
                className={filter === "Completed" ? "active" : ""}
                onClick={() => setFilter("Completed")}
              >
                Completed
              </span>
            </div>
            <button onClick={handleLogout} disabled={tasks.length > 0} className="logout-button">
              Log Out
            </button>
          </div>

          <ul className="task-box">
            {filteredTasks.map((task, index) => (
              <li key={index} className="task-item">
                <span className="task-name">{task.taskName}</span>
                <span className="task-status">{task.status}</span>
                <button
                  onClick={() => handleTaskStatusChange(index, "Pending")}
                  className="status-button"
                >
                  Pending
                </button>
                <button
                  onClick={() => handleTaskStatusChange(index, "Completed")}
                  className="status-button"
                >
                  Completed
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
