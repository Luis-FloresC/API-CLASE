const sequelize = require("sequelize");
const db = require("../configuracion/db");
const bcrypt = require("bcrypt");
const Personas = db.define(
  "Personas",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    apellido: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    telefono: {
      type: sequelize.STRING(45),
      allowNull: true,
    },
    estado: {
      type: sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    imagen: {
      type: sequelize.STRING(250),
      allowNull: true,
    },
  },
  {
    tableName: "personas",
    timestamps: false,
  }
);

module.exports = Personas;
