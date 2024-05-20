import { sequelize, User } from "../../lib/sequelize";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email } = req.body;

    try {
      const newUser = await User.create({ name, email });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: "Failed to create user" });
    }
  } else if (req.method === "GET") {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
