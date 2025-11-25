import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const Category = sequelize.define("Category", {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false // porque tu JSON ya trae IDs
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: DataTypes.STRING
});

export default Category;
