"use client";
import { useState, useEffect } from "react";
import "./customer.css";

export default function CustomerPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskName, setTaskName] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("../api/employee");
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (selectedEmployee) {
        try {
          const response = await fetch(
            `../api/addtask?employeeid=${selectedEmployee.id}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch tasks");
          }
          const data = await response.json();
          setTasks(data);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      }
    };

    fetchTasks();
  }, [selectedEmployee]);
  const handleAddTask = async () => {
    if (!selectedEmployee) {
      alert("Please select an employee before adding a task!");
      return;
    }
    if (taskName.trim() === "") {
      alert("Task name cannot be empty!");
      return;
    }
    if (dueDate.trim() === "") {
      alert("Due date cannot be empty!");
      return;
    }

    const newTask = {
      employee: selectedEmployee.lname,
      taskName: taskName,
      dueDate: dueDate,
      status: "Pending",
    };

    try {
      const response = await fetch("../api/addtask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      setTasks([...tasks, newTask]);
      setTaskName("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
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
            <div
              key={employee.email}
              className="employee-card"
              onClick={() => setSelectedEmployee(employee)}
            >
              <p>
                <strong>Name:</strong> {employee.lname}
              </p>
              <p>
                <strong>Position:</strong> {employee.position}
              </p>
              <p>
                <strong>Email:</strong> {employee.email}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <div className="employee-info">
            <h3>Employee Information</h3>
            <p>
              <strong>Name:</strong> {selectedEmployee.lname}
            </p>
            <p>
              <strong>Position:</strong> {selectedEmployee.position}
            </p>
            <p>
              <strong>Email:</strong> {selectedEmployee.email}
            </p>
            <button
              className="back-button"
              onClick={() => setSelectedEmployee(null)}
            >
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
            <input
              type="date"
              className="input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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
            <button
              onClick={handleLogout}
              disabled={tasks.length > 0}
              className="logout-button"
            >
              <a href="../login" className="logout-link">
                Log Out
              </a>
            </button>
          </div>

          <ul className="task-box">
            {filteredTasks.map((task, index) => (
              <li key={index} className="task-item">
                <span className="task-name">{task.taskName}</span>
                <span className="task-status">{task.status}</span>
                <span className="task-due-date">{task.dueDate}</span>
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
