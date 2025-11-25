import express from "express";
import {
  getCartByUser,
  addToCart,
  removeFromCart,
  clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCartByUser);
router.post("/add", addToCart);
router.delete("/remove", removeFromCart);
router.delete("/clear/:userId", clearCart);

export default router;
