//Declaracion para utilizar el paquete sequelize
const sequelize = require("sequelize");
//Guardamos la configuracion de nuestra base de datos 
const db = require("../configuracion/db");
//Paquete para encriptamiento de contraseña
const bcrypt = require("bcrypt");

const now = new Date();
//declaramos el modelo especificando cada campo con su longitud y si permite null de la tabla 
//específicamente de personas
const Sesiones = db.define(
  "Sesiones",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM('CO','FA'),
      allowNull: true,
    },
    fechahora: {
      type: sequelize.DATE,
      allowNull: true,
      defaultValue: now
    },
    usuarios_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "sesiones",
    timestamps: false,
  }
);

//Exportamos el modulo de personas
module.exports = Sesiones;
