import express from "express";
import cors from "cors";

// Import DB
import { sequelize } from "./data/db.js";

// Importar rutas
import productRoutes from "./routes/product.routes.js";
import userRoutes from "./routes/user.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Puerto para local y Azure
const PORT = process.env.PORT || 3000;

// RUTAS
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

// Conectar BD y levantar servidor
sequelize
  .authenticate()
  .then(() => {
    console.log("✔ Conectado a PostgreSQL");

    return sequelize.sync({ alter: true }); // crea/actualiza tablas
  })
  .then(() => {
    console.log("✔ Tablas sincronizadas");

    app.listen(PORT, () => {
      console.log(`✔ Backend corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ Error conectando a la BD:", error);
  });
