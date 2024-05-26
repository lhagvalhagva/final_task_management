// app/api/tasks/route.js
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await sql`
      SELECT 
        taskassignment.taskID, 
        taskassignment.taskName, 
        taskassignment.status, 
        clients.clientName AS customer
      FROM 
        taskassignment
      JOIN 
        clients ON taskassignment.clientID = clients.clientID
    `;

    const tasks = result.rows.reduce((acc, task) => {
      const { customer, ...rest } = task;
      if (!acc[customer]) acc[customer] = [];
      acc[customer].push(rest);
      return acc;
    }, {});

    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: "Database query failed" },
      { status: 500 }
    );
  }
}
