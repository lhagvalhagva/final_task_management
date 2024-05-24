// /api/data.js

import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        const { email, password, userType } = await req.json();
  
        if (userType === "customer") {
          const customerResult = await sql`SELECT * FROM clients WHERE email = ${email} AND password = ${password}`;
          if (customerResult.rows.length > 0) {
            res.status(200).json({ message: "Customer login successful" });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        } else if (userType === "employee") {
          const employeeResult = await sql`SELECT * FROM employees WHERE email = ${email} AND password = ${password}`;
          if (employeeResult.rows.length > 0) {
            res.status(200).json({ message: "Employee login successful" });
          } else {
            res.status(401).json({ error: "Invalid credentials" });
          }
        } else {
          res.status(400).json({ error: "Invalid user type" });
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
      }
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  }
