//Declaracion para utilizar el paquete sequelize
const sequelize = require("sequelize");
//Guardamos la configuracion de nuestra base de datos 
const db = require("../configuracion/db");
//Paqute para encriptamiento de contraseña
const bcrypt = require("bcrypt");
//declaramos el modelo especificando cada campo con su longitud y si permite null de la tabla 
//especificamente de personas
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

//Exportamos el modulo de personas
module.exports = Personas;
