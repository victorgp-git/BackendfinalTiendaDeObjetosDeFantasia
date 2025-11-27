import User from "../models/user.model.js";
import Product from "../models/product.model.js";
import Order from "../models/order.model.js";

export const getStats = async (req, res) => {
  try {
    const totalVentas = await Order.sum("total");
    const totalOrdenes = await Order.count();
    const productosActivos = await Product.count({ where: { isActive: true } });
    const usuarios = await User.count();

    res.json({
      totalVentas,
      totalOrdenes,
      productosActivos,
      usuarios
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Lista completa de productos (modo panel)
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Activar / Desactivar producto
export const toggleProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ error: "Producto no encontrado" });

    product.isActive = !product.isActive;
    await product.save();
    res.json(product);

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Usuarios para admin
export const getAllUsersAdmin = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Activar / desactivar usuario
export const toggleUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

    user.activo = !user.activo;
    await user.save();

    res.json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

// Órdenes para admin
export const getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["createdAt", "DESC"]]
    });
    res.json(orders);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};  