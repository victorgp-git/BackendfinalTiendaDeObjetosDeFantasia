import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Order = sequelize.define("Order", {
  // NO DEFINIMOS ID — lo maneja PostgreSQL
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING,
    defaultValue: "Completada"
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  timestamps: true,          // tu BD ya tiene createdAt / updatedAt
  freezeTableName: true      // evita pluralizaciones raras
});

export default Order;
