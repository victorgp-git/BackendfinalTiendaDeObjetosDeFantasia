import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Product = sequelize.define("Product", {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false // tu JSON ya trae IDs
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: DataTypes.STRING,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: DataTypes.STRING,
  image: DataTypes.STRING,
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

export default Product;
