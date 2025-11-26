import express from "express";
import cors from "cors";
import sequelize from "./data/db.js";

// Registrar modelos
import "./models/category.model.js";
import "./models/product.model.js";
import "./models/user.model.js";
import "./models/order.model.js";
import "./models/cart.model.js";

// Rutas
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Endpoints
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Conexión BD + sync
sequelize
  .authenticate()
  .then(() => {
    console.log("✔ Conectado a PostgreSQL Azure");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("✔ Tablas sincronizadas");
    app.listen(PORT, () => console.log(`✔ Server on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("❌ Error conectando a BD:", err);
  });
