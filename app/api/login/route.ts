import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(req: NextRequest) {
  const { email, password, userType } = await req.json();

  try {
    let user;
    if (userType === 'employee') {
      const result = await sql`SELECT * FROM employees WHERE email = ${email} AND password = ${password}`;
      user = result.rows[0];
    } else {
      const result = await sql`SELECT * FROM clients WHERE email = ${email} AND password = ${password}`;
      user = result.rows[0];
    }

    if (user) {
      return NextResponse.json({ message: 'Login successful', user }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Нууц үг эсвэл email буруу байна !!!' }, { status: 401 });
    }
  } catch (error) {
    console.error('Database query error:', error);
    return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};