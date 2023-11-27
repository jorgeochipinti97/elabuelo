// pages/api/products.js

import Product from "@/app/Models/Product";
import { connectDB } from "@/app/database/db";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  if (method === "GET") {
    try {
      const products = await Product.find().sort({ createdAt: "desc" }).lean();
      return res.status(200).json(products);
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Maneja otros métodos HTTP o retorna un error si no se soportan
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
