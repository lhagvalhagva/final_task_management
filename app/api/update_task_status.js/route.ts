import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  if (req.method === "PUT") {
    try {
      const { taskID, status } = req.body;
      
      await sql`
        UPDATE taskassignment
        SET status = ${status}
        WHERE taskID = ${taskID}
      `;
      
      res.status(200).json({ message: "Task status updated successfully" });
    } catch (error) {
      console.error("Error updating task status:", error);
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
