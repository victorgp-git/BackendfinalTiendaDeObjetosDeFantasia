import sequelize from "../data/db.js";
import Category from "../models/category.model.js";
import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

import data from "./data.json" with { type: "json" };

async function seed() {
  try {
    console.log("🌱 Sincronizando base de datos…");
    await sequelize.sync({ force: true });

    console.log("➡ Insertando categorías…");
    await Category.bulkCreate(data.categories);

    console.log("➡ Insertando productos…");
    await Product.bulkCreate(data.products);

    console.log("➡ Insertando usuarios…");
    await User.bulkCreate(data.users);

    console.log("➡ Insertando órdenes…");
    await Order.bulkCreate(data.orders);

    console.log("✔ SEED COMPLETADO");
    process.exit();
  } catch (error) {
    console.error("❌ Error en seed:", error);
    process.exit(1);
  }
}
sequelize.authenticate();
//seed();   
