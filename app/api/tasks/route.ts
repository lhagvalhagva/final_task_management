import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export default async function handler(req: Request) {
  try {
    const result = await sql`
      SELECT taskassignment.taskID, taskassignment.taskName, taskassignment.status, clients.clientName
      FROM taskassignment
      JOIN clients ON taskassignment.clientID = clients.clientID
    `;

    const tasks = result.rows;

    return NextResponse.json({ result: tasks }, { status: 200 });
  } catch (error) {
    console.error("GET request error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
