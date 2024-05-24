"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [position, setPosition] = useState("");
  const [division, setDivision] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("../api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userType,
          phoneNumber,
          fName,
          ...(userType === "employee" && { position, division, lname }),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Registration successful!");
        setError("");
      } else {
        setError(data.error);
        setSuccess("");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setSuccess("");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
      {success && (
        <p style={{ color: "green", textAlign: "center" }}>{success}</p>
      )}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="phone_number">Phone number:</label>
          <input
            type="tel"
            id="phone_number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="fName">First Name:</label>
          <input
            type="text"
            id="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
            required
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
            required
          />
        </div>

        {userType === "employee" && (
          <>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="lName">Last Name:</label>
              <input
                type="text"
                id="lName"
                value={lName}
                onChange={(e) => setLName(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
                required
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="position">Position:</label>
              <input
                type="text"
                id="position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
                required
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>
            <input
              type="radio"
              value="customer"
              checked={userType === "customer"}
              onChange={() => setUserType("customer")}
            />
            &nbsp;Customer
          </label>
          <label>
            <input
              type="radio"
              value="employee"
              checked={userType === "employee"}
              onChange={() => setUserType("employee")}
            />
            &nbsp;Employee
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          Register
        </button>
      </form>

      <p style={{ textAlign: "center" }}>
        Already have an account? <Link href="../login">Login</Link>
      </p>
      <p style={{ textAlign: "left" }}>
        {"nvvr lvv butsah  ==>"}
        <Link href="/" style={{ color: "blue" }}>
          HOME
        </Link>
      </p>
    </div>
  );
}
