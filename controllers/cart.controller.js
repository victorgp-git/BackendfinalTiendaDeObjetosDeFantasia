import Cart from "../models/cart.model.js";

// Obtener carrito por usuario
export const getCartByUser = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    const items = await Cart.findAll({ where: { userId } });

    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo carrito" });
  }
};

// Agregar al carrito
export const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    let item = await Cart.findOne({ where: { userId, productId } });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      item = await Cart.create({ userId, productId, quantity });
    }

    res.json({ success: true, item });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error agregando al carrito" });
  }
};

// Eliminar 1 producto
export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await Cart.destroy({ where: { userId, productId } });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error eliminando producto" });
  }
};

// Vaciar carrito
export const clearCart = async (req, res) => {
  try {
    const userId = Number(req.params.userId);

    await Cart.destroy({ where: { userId } });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error limpiando carrito" });
  }
};
