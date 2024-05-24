import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
      const result = await sql`SELECT * FROM taskassignment;`;
      return NextResponse.json({ result: result.rows }, { status: 200 });
    } catch (error) {
      console.error("GET request error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }