import { DataTypes } from "sequelize";
import sequelize from "../data/db.js";

const User = sequelize.define("User", {
  id: { 
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false // porque tu JSON ya trae IDs
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
});

export default User;
