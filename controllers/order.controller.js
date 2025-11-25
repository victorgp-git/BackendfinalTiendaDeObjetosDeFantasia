import { db } from "../data/db.js";

export const createOrder = (req, res) => {
  const { userId, items, total, shipping, paymentMethod } = req.body;

  const orderId = db.orders.length + 200;

  const newOrder = {
    id: orderId,
    cliente: userId,
    total,
    estado: "Completada",
    fecha: new Date().toISOString().split("T")[0]
  };

  db.orders.push(newOrder);

  // limpiar carrito
  db.cart = db.cart.filter(i => i.userId !== userId);

  res.json({ success: true, orderId });
};

export const getOrderById = (req, res) => {
  const id = Number(req.params.id);
  const order = db.orders.find(o => o.id === id);

  if (!order) return res.status(404).json({ error: "Orden no encontrada" });

  res.json(order);
};
