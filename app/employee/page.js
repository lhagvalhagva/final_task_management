"use client";

import { useEffect, useState } from "react";
import "./employee.css";

export default function EmployeePage() {
  const [tasks, setTasks] = useState([]);
  const [employeeTasks, setEmployeeTasks] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    const allEmployeeTasks = {
      JohnDoe: [
        {
          id: 1,
          customer: "John Doe",
          taskName: "Task 1",
          status: "Pending",
        },
        {
          id: 2,
          customer: "John Doe",
          taskName: "Task 2",
          status: "Completed",
        },
      ],
      JaneSmith: [
        {
          id: 3,
          customer: "Jane Smith",
          taskName: "Task 3",
          status: "Pending",
        },
        {
          id: 4,
          customer: "Jane Smith",
          taskName: "Task 4",
          status: "Completed",
        },
      ],
    };
    setEmployeeTasks(allEmployeeTasks);
  }, []);

  const handleEmployeeChange = (employeeName) => {
    setSelectedEmployee(employeeName);
    setTasks(employeeTasks[employeeName]);
  };

  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    setEmployeeTasks({
      ...employeeTasks,
      [selectedEmployee]: updatedTasks,
    });
  };

  return (
    <div className="wrapper">
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
          <li key={task.id}>
            <span>{task.customer}</span>
            <span>{task.taskName}</span>
            <span style={{ textTransform: "capitalize" }}>{task.status}</span>
            {/* Button to change task status */}
            {task.status === "Pending" && (
              <button
                className="mark-completed"
                onClick={() => handleTaskStatusChange(task.id, "Completed")}
              >
                Mark as Completed
              </button>
            )}
            {task.status === "Completed" && (
              <button
                className="mark-pending"
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
