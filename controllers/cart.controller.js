import { db } from "../data/db.js";

export const getCartByUser = (req, res) => {
  const userId = Number(req.params.userId);
  const items = db.cart.filter(i => i.userId === userId);
  res.json(items);
};

export const addToCart = (req, res) => {
  const { userId, productId, quantity } = req.body;

  let item = db.cart.find(i => i.userId === userId && i.productId === productId);

  if (item) {
    item.quantity += quantity;
  } else {
    db.cart.push({ userId, productId, quantity });
  }

  res.json({ success: true, cart: db.cart });
};

export const removeFromCart = (req, res) => {
  const { userId, productId } = req.body;

  db.cart = db.cart.filter(
    i => !(i.userId === userId && i.productId === productId)
  );

  res.json({ success: true });
};

export const clearCart = (req, res) => {
  const userId = Number(req.params.userId);
  db.cart = db.cart.filter(i => i.userId !== userId);
  res.json({ success: true });
};
