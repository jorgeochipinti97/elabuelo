

import Query from "@/app/Models/Query";
import { connectDB } from "@/app/database/db";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  if (method === "POST") {
    try {
      const query = new Query(req.body);
      await query.save();
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === "GET") {
    const queries = await Query.find().lean();
    res.status(201).json(queries);
  } else {
    // Maneja otros métodos HTTP o retorna un error si no se soportan
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
