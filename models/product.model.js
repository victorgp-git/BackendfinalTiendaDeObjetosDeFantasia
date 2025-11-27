import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Product = sequelize.define("Product", {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true 
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.TEXT
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  
  isBestSeller: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  isNew: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Product;