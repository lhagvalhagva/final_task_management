"use client";

import { useState, useEffect } from "react";
import "./customer.css";
import NavBar from "../../components/NavBar";

export default function CustomerPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [taskname, setTaskName] = useState("");
  const [duedate, setDueDate] = useState("");
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
            "../api/tasks?employeeid=" + selectedEmployee.employeeid
          );
          if (!response.ok) {
            throw new Error("Failed to fetch tasks for employee");
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
    if (taskname.trim() === "" || duedate.trim() === "") {
      alert("Task name and due date cannot be empty!");
      return;
    }

    const newTask = {
      taskname,
      employeeid: selectedEmployee.employeeid,
      // clientid: selectedEmployee.clientid,
      duedate,
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
      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
      setTaskName("");
      setDueDate("");
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task");
    }
  };

  const handleLogout = () => {
    if (tasks.length > 0) {
      alert("Please clear all tasks before logging out!");
      return;
    }
    window.location.href = "/app/login";
  };

  const handleTaskStatusChange = async (taskid, newStatus) => {
    try {
      const response = await fetch(
        `../api/updatetask?taskid=${taskid}&status=${newStatus}`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update task status");
      }
      const updatedTask = await response.json();
      setTasks(
        tasks.map((task) => (task.taskid === taskid ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status");
    }
  };

  const filteredTasks = Array.isArray(tasks)
    ? tasks.filter((task) => filter === "All" || task.status === filter)
    : [];

  return (
    <div className="wrapper">
      <NavBar />
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
              value={taskname}
              onChange={(e) => setTaskName(e.target.value)}
            />
            <input
              type="date"
              className="input"
              value={duedate}
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
                className={filter === "Complete" ? "active" : ""}
                onClick={() => setFilter("Complete")}
              >
                Complete
              </span>
            </div>
            <button
              onClick={handleLogout}
              disabled={tasks.length > 0}
              className="logout-button"
            >
              <a href="/login" className="logout-link">
                Log Out
              </a>
            </button>
          </div>

          <ul className="task-box">
            {filteredTasks.map((task) => (
              <li key={task.taskid} className="task-item">
                <span className="task-name">{task.taskname}</span>
                <span className="task-status">{task.status}</span>
                <span className="task-due-date">{task.duedate}</span>
                <span className="task-employee">
                  Assigned to: {selectedEmployee.lname}
                </span>
                <button
                  onClick={() => handleTaskStatusChange(task.taskid, "Pending")}
                  className="status-button"
                >
                  Pending
                </button>
                <button
                  onClick={() =>
                    handleTaskStatusChange(task.taskid, "Complete")
                  }
                  className="status-button"
                >
                  Complete
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
