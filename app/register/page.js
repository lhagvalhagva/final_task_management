"use client";
import { useState } from "react";
import Link from "next/link";

export default function RegisterPage() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");
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
          ...(userType === "employee" && { position, lName }),
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
      console.log("not working", error);
    }
  };
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(to left, rgb(241, 227, 248), #fff)',
    },
    card: {
      background: '#fff',
      padding: '40px',
      maxWidth: '400px',
      width: '100%',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      textAlign: 'center',
    },
    title: {
      marginBottom: '20px',
      fontSize: '24px',
      color: '#333',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      textAlign: 'left',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      color: '#555',
    },
    input: {
      padding: '10px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '4px',
      transition: 'all 0.3s ease',
    },
    inputFocus: {
      borderColor: '#007bff',
      boxShadow: '0 0 5px rgba(0, 123, 255, 0.5)',
    },
    radioGroup: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
    },
    button: {
      padding: '10px',
      width: '100%',
      backgroundColor: '#89B4FF',
      color: '#fff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    footer: {
      marginTop: '20px',
      color: '#555',
    },
    link: {
      color: '#99CCFF',
      textDecoration: 'none',
    },
  };

  return (
<div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Бүртгүүлэх</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="fName" style={styles.label}>First Name:</label>
            <input
              type="text"
              id="fName"
              value={fName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lName" style={styles.label}>Last Name:</label>
            <input
              type="text"
              id="lName"
              value={lName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phone_number" style={styles.label}>Phone Number:</label>
            <input
              type="tel"
              id="phone_number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Email:</label>
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
            <label htmlFor="password" style={styles.label}>Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          {/* <div style={styles.formGroup}>
            <label htmlFor="position" style={styles.label}>Position:</label>
            <input
              type="text"
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              style={styles.input}
              required
            />
          </div> */}
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Save
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link href="../login" style={styles.link}>Нэвтрэх</Link>
        </p>
        <p style={styles.footer}>
          <Link href="/" style={styles.link}>Буцах</Link>
        </p>
      </div>
    </div>
  );
};
