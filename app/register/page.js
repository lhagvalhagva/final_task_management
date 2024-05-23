"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [userType, setUserType] = useState("customer");
<<<<<<< HEAD
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [position, setPosition] = useState("");
  const [division, setDivision] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
=======
  const router = useRouter();
>>>>>>> 22b99a8dc45f32aa888e140f352908931833184b

  const handleSubmit = (e) => {
    e.preventDefault();
<<<<<<< HEAD

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
=======
    if (password !== repeatPassword) {
      alert("Passwords do not match!");
      return;
>>>>>>> 22b99a8dc45f32aa888e140f352908931833184b
    }
    console.log("Register with:", firstName, lastName, phoneNumber, email, password, userType);
    // Perform registration logic here
    if (userType === "customer") {
      router.push("../customer");
    } else {
      router.push("../employee");
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
<<<<<<< HEAD
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
            <div style={{ marginBottom: "15px" }}>
              <label htmlFor="division">Division:</label>
              <input
                type="text"
                id="division"
                value={division}
                onChange={(e) => setDivision(e.target.value)}
                style={{ width: "100%", padding: "10px" }}
                required
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label style={{ marginRight: "10px" }}>
=======
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Бүртгүүлэх</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.label}>First Name:</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.label}>Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="phoneNumber" style={styles.label}>Phone Number:</label>
            <input
              type="tel"
              id="phoneNumber"
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
>>>>>>> 22b99a8dc45f32aa888e140f352908931833184b
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="repeatPassword" style={styles.label}>Repeat Password:</label>
            <input
              type="password"
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              style={styles.input}
              required
            />
<<<<<<< HEAD
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
=======
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
            onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
          >
            Register
          </button>
        </form>
        <p style={styles.footer}>
          Already have an account? <Link href="../login" style={styles.link}>Login</Link>
        </p>
        <p style={styles.footer}>
          <Link href="/" style={styles.link}>Home</Link>
        </p>
      </div>
>>>>>>> 22b99a8dc45f32aa888e140f352908931833184b
    </div>
  );
};

export default RegisterPage;