//Declaracion para utilizar el paquete sequelize
const sequelize = require("sequelize");
//Guardamos la configuracion de nuestra base de datos 
const db = require("../configuracion/db");
//Paquete para encriptamiento de contraseña
const bcrypt = require("bcrypt");
//declaramos el modelo especificando cada campo con su longitud y si permite null de la tabla 
//específicamente de personas
const Tipos = db.define(
  "Tipos",
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
    activo: {
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
    tableName: "tipos",
    timestamps: false,
  }
);

//Exportamos el modulo de personas
module.exports = Tipos;
