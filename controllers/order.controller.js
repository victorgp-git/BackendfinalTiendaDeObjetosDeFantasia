// controllers/order.controller.js
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";


export const createOrder = async (req, res) => {
  try {
    const { total, userId } = req.body;

    // Crear orden SOLO con columnas reales
    const order = await Order.create({
      total,
      estado: "Completada",
      fecha: new Date().toISOString().split("T")[0]
    });

    // limpiar carrito si quieres
    if (userId) {
      await Cart.destroy({ where: { userId } });
    }

    res.json({ success: true, orderId: order.id });

  } catch (error) {
    console.error("Error creando orden:", error);
    res.status(500).json({ error: "Error creando orden" });
  }
};


export const getOrderById = async (req, res) => {
  try {
    const id = Number(req.params.id);

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ error: "Orden no encontrada" });
    }

    res.json(order);

  } catch (error) {
    console.error("Error obteniendo orden:", error);
    res.status(500).json({ error: "Error obteniendo orden" });
  }
};
