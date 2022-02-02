//Declaracion para utilizar el paquete sequelize
const sequelize = require("sequelize");
//Guardamos la configuracion de nuestra base de datos
const db = require("../configuracion/db");
//Paqute para encriptamiento de contraseña
const bcrypt = require("bcrypt");
//declaramos el modelo especificando cada campo con su longitud y si permite null de la tabla
//especificamente de personas
const Usuarios = db.define(
  "Usuario",
  {
    id: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    personas_id: {
      type: sequelize.INTEGER,
      allowNull: false,
    },
    login: {
      type: sequelize.STRING(45),
      allowNull: false,
    },
    correo: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    contrasena: {
      type: sequelize.STRING(250),
      allowNull: false,
    },
    estado: {
      type: sequelize.ENUM("A", "I", "B"),
      allowNull: true,
      defaultValue: "A",
    },
    fallidos: {
      type: sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    pin: {
      type: sequelize.CHAR(4),
      allowNull: true,
      defaultValue: '0000',
    },
    tipo: {
      type: sequelize.ENUM("CL", "EM"),
      allowNull: true,
      defaultValue: "CL",
    },
  },
  {
    tableName: "usuarios",
    timestamps: false,
    hooks: {
      beforeCreate(Usuario) {
        const hash = bcrypt.hashSync(Usuario.contrasena, 10);
        Usuario.contrasena = hash;
      },
      beforeUpdate(Usuario) {
        const hash = bcrypt.hashSync(Usuario.contrasena, 10);
        Usuario.contrasena = hash;
      },
    },
  }
);


Usuarios.prototype.VerificarContrasenia = (con, com) => {
  return bcrypt.compareSync(con, com);
};

//Exportamos el modulo de personas
module.exports = Usuarios;
