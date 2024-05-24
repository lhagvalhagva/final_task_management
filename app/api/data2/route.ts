// /api/data2/route.ts

import { sql } from '@vercel/postgres';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Method not allowed" });
        return;
    }

    try {
        const { email, password, userType } = await req.body;
        let result;
        if (userType === "customer") {
            result = await sql`SELECT * FROM clients WHERE email = ${email} AND password = ${password}`;
        } else if (userType === "employee") {
            result = await sql`SELECT * FROM employees WHERE email = ${email} AND password = ${password}`;
        } else {
            res.status(400).json({ error: "Invalid user type" });
            return;
        }

        if (result.rows.length > 0) {
            res.status(200).json({ message: `${userType} login successful` });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (error) {
        console.error("An unexpected error occurred:", error);
        res.status(500).json({ error: "An unexpected error occurred" });
    }
}
