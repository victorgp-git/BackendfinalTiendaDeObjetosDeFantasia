import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Order = sequelize.define("Order", {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false // porque tu JSON ya trae IDs
  },
  cliente: {
    type: DataTypes.STRING,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  estado: DataTypes.STRING,
  fecha: DataTypes.STRING
});

export default Order;
