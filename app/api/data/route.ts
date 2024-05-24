import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`SELECT * FROM clients;`;
    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error) {
    console.error("GET request error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, userType, phoneNumber, fName, lName, position } = body;

    let result;

    if (userType === 'employee') {
      result = await sql`
        INSERT INTO employees (fName, lName, position, phoneNo, division, password,email) 
        VALUES (${fName}, ${lName}, ${position}, ${phoneNumber}, ${password},${email})
        RETURNING *;
      `;
    } else if (userType === 'customer') {
      result = await sql`
        INSERT INTO clients (email, phoneNo, clientname, password) 
        VALUES (${email}, ${phoneNumber}, ${fName + ' ' + lName}, ${password})
        RETURNING *;
      `;
    } else {
      throw new Error('Invalid user type');
    }

    return NextResponse.json({ message: `${userType.charAt(0).toUpperCase() + userType.slice(1)} added successfully`, user: result.rows[0] }, { status: 200 });
  } catch (error) {
    console.error("POST request error:", error);
    return NextResponse.json({ error: 'Error adding user', details: error.message }, { status: 500 });
  }
}


// export default async function handler(req, res) {
//   if (req.method === "POST") {
//     try {
//       const { email, password, userType } = req.body;


//       if (userType === "customer") {

//         const customerResult = await sql`SELECT * FROM clients WHERE email = ${email} AND password = ${password}`;
//         if (customerResult.rows.length > 0) {
//           res.status(200).json({ message: "Customer login successful" });
//         } else {
//           res.status(401).json({ error: "Invalid credentials" });
//         }
//       } else if (userType === "employee") {

//         const employeeResult = await sql`SELECT * FROM employees WHERE email = ${email} AND password = ${password}`;
//         if (employeeResult.rows.length > 0) {
//           res.status(200).json({ message: "Employee login successful" });
//         } else {
//           res.status(401).json({ error: "Invalid credentials" });
//         }
//       } else {
//         res.status(400).json({ error: "Invalid user type" });
//       }
//     } catch (error) {
//       console.error("An unexpected error occurred:", error);
//       res.status(500).json({ error: "An unexpected error occurred" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }