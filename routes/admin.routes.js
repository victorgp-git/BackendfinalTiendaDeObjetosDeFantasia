import express from "express";
import {
  getStats,
  getAllProductsAdmin,
  toggleProduct,
  getAllUsersAdmin,
  toggleUser,
  getAllOrdersAdmin
} from "../controllers/admin.controller.js";

const router = express.Router();

// Dashboard
router.get("/stats", getStats);

// Productos admin
router.get("/products", getAllProductsAdmin);
router.put("/products/:id/toggle", toggleProduct);

// Usuarios admin
router.get("/users", getAllUsersAdmin);
router.put("/users/:id/toggle", toggleUser);

// Órdenes admin
router.get("/orders", getAllOrdersAdmin);

export default router;