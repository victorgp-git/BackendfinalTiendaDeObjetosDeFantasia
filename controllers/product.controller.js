import { db } from "../data/db.js";

export const getProducts = (req, res) => {
  res.json(db.products);
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = db.products.find(p => p.id === id);
  if (!product) return res.status(404).json({ error: "Producto no encontrado" });
  res.json(product);
};
