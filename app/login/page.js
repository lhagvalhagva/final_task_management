"use client";
"use strict";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("../api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, userType }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
      }

      const data = await res.json();

      if (userType === "customer") {
        router.push("../customer");
      } else {
        router.push("../employee");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "linear-gradient(to left, rgb(241, 227, 248), #fff)",
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "40px",
          maxWidth: "400px",
          width: "100%",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "20px", fontSize: "24px", color: "#333" }}>
          Нэвтрэх
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <div style={{ textAlign: "left" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "5px", color: "black" }}
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </div>
          <div style={{ textAlign: "left" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "5px", color: "black" }}
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                padding: "10px",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
              required
            />
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <label style={{ display: "block", color: "black" }}>
              <input
                type="radio"
                value="customer"
                checked={userType === "customer"}
                onChange={() => setUserType("customer")}
              />
              &nbsp;Customer
            </label>
            <label style={{ display: "block", color: "black" }}>
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
              padding: "10px",
              width: "100%",
              backgroundColor: "#89B4FF",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#89B4FF")}
          >
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px", color: "#555" }}>
          Don't have an account?{" "}
          <Link
            href="../register"
            style={{ color: "#99CCFF", textDecoration: "none" }}
          >
            Бүртгүүлэх
          </Link>
        </p>
        <p style={{ marginTop: "20px", color: "#555" }}>
          <Link href="/" style={{ color: "#99CCFF", textDecoration: "none" }}>
            Буцах
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
