import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    await sql`SELECT * FROM test;`;
    const result = await sql`SELECT * FROM test;`;


    return NextResponse.json({ result: result.rows }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { email } = body;

    const result = await sql`
      INSERT INTO test (email) 
      VALUES (${email})
      RETURNING *;
    `;

    return NextResponse.json({ message: 'Client added successfully', client: result.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error adding client', details: error.message }, { status: 500 });
  }
}
