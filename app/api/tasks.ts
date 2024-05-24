// /pages/api/tasks.ts

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function getTasks(req: Request) {
  try {
    const result = await sql`
      SELECT taskassignment.taskID, taskassignment.taskName, taskassignment.status, clients.clientName
      FROM taskassignment
      JOIN clients ON taskassignment.clientID = clients.clientID
    `;

    return NextResponse.json({ tasks: result.rows }, { status: 200 });
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
