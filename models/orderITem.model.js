import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const OrderItem = sequelize.define("OrderItem", {
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  }
});

export default OrderItem;
