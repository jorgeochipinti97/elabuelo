// pages/api/products.js

import Product from "@/app/Models/Product";
import { connectDB } from "@/app/database/db";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  if (method === "POST") {
    try {
      const product = new Product(req.body);
      await product.save();

      res.status(201).json({ success: true });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === "DELETE") {
    const { _id } = req.body;
    console.log(_id);
    await Product.findByIdAndDelete({ _id: _id });
    return res
      .status(200)
      .json({ message: "Producto seleccionados eliminados exitosamente" });
  } else if (method === "PUT") {
    const { _id } = req.body;

    await Product.findByIdAndUpdate(_id, req.body);
    return res
      .status(200)
      .json({ message: "Producto actualizado exitosamente" });
  } else {
    // Maneja otros métodos HTTP o retorna un error si no se soportan
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
