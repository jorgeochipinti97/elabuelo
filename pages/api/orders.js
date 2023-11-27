import Order from "@/app/Models/Order";
import { connectDB } from "@/app/database/db";

export default async function handler(req, res) {
  const { method } = req;
  await connectDB();
  switch (method) {
    case "POST":
      return createOrder(req, res);
    case "PUT":
      return updateOrder(req, res);
    case "GET":
      return getOrder(req, res);
    default:
      res.statusCode = 200;
      res.end();
      break;
  }
}

const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


const getOrder = async (req, res) => {
  try {
    const order = await Order.find().lean();

    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateOrder = async (req, res) => {
  const { _id } = req.body;
  await Order.findByIdAndUpdate(_id, req.body);
  res.status(200).json({ success: true });
};
