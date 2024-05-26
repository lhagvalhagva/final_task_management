import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { employee, taskName, dueDate, status } = await request.json();

    if (!employee || !taskName || !dueDate || !status) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const employeeResult: any = await sql`SELECT employeeid FROM employees WHERE lname = ${employee}`;
    if (employeeResult.length === 0) {
        console.error("No employee found with the specified lname:", employee);
    }

    const employeeid = employeeResult[0];

    await sql`
      INSERT INTO taskassignment (taskName, employeeid, dueDate, status)
      VALUES (${taskName}, ${employeeid}, ${dueDate}, ${status})
    `;
    return NextResponse.json({ message: "Task added successfully" });
  } catch (error) {
    console.error('Error adding task:', error);
    return NextResponse.json({ error: 'Error adding task', details: error.message }, { status: 500 });
  }
}