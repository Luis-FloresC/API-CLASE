const sequelize = require('sequelize');
const db = require('../configuracion/db');
const bcrypt = require('bcrypt');
const Personas = db.define(

    "persona",
    {
        idPersona: {
                type: sequelize.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull: false
        },
        nombrePersona:{
            type: sequelize.STRING(50),
            allowNull: false
        },
        apellidoPersona:{
            type: sequelize.STRING(50),
            allowNull: false
        },
        telefonoPersona:{
            type: sequelize.STRING(30),
            allowNull: true
        },
        imagenPersona:{
            type: sequelize.STRING(50),
            allowNull: true
        },
        idEstado:{
            type: sequelize.INTEGER,
            allowNull: false
        },
        fotoUrl:{
            type: sequelize.STRING(50),
            allowNull: true
        },
       
    },
    {
        tableName: "Personas",
        timestamps:false
        
        
    }
);

module.exports = Personas;