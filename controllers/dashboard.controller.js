import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import { Op } from "sequelize"; // Para filtrar por fechas

export const getDashboardSummary = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = { [Op.between]: [new Date(startDate), new Date(endDate)] };
    }

    const totalOrders = await Order.count({ where: dateFilter });

    const totalUsers = await User.count({ where: dateFilter });

    const totalRevenue = await Order.sum('total', { where: dateFilter }) || 0;

    res.json({
      orders: totalOrders,
      users: totalUsers,
      revenue: totalRevenue
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener resumen del dashboard" });
  }
};