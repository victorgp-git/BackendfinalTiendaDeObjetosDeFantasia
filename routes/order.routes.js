import express from "express";
import {
  createOrder,
  getOrderById
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/:id", getOrderById);

export default router;
