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

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(to left, rgb(241, 227, 248), #fff)",
    },
    card: {
      background: "#fff",
      padding: "40px",
      maxWidth: "400px",
      width: "100%",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    formGroup: {
      textAlign: "left",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      color: "black",
    },
    input: {
      padding: "10px",
      width: "100%",
      border: "1px solid #ccc",
      borderRadius: "4px",
      transition: "all 0.3s ease",
    },
    inputFocus: {
      borderColor: "#89B4FF",
      boxShadow: "0 0 5px rgba(0, 123, 255, 0.5)",
    },
    radioGroup: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    button: {
      padding: "10px",
      width: "100%",
      backgroundColor: "#89B4FF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    footer: {
      marginTop: "20px",
      color: "#555",
    },
    link: {
      color: "#99CCFF",
      textDecoration: "none",
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
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
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Нэвтрэх</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.radioGroup}>
            <label style={styles.label}>
              <input
                type="radio"
                value="customer"
                checked={userType === "customer"}
                onChange={() => setUserType("customer")}
              />
              &nbsp;Customer
            </label>
            <label style={styles.label}>
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
            style={styles.button}
            onMouseEnter={(e) =>
              (e.target.style.backgroundColor =
                styles.buttonHover.backgroundColor)
            }
            onMouseLeave={(e) =>
              (e.target.style.backgroundColor = styles.button.backgroundColor)
            }
          >
            Login
          </button>
        </form>
        <p style={styles.footer}>
          Don&apos;t have an account?{" "}
          <Link href="../register" style={styles.link}>
            Бүртгүүлэх
          </Link>
        </p>
        <p style={styles.footer}>
          <Link href="/" style={styles.link}>
            Буцах
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
