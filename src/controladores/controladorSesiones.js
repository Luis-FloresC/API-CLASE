const modeloSesiones = require("../modelos/modeloSesiones");
const modeloUsuario = require("../modelos/modeloUsuario");
const modeloPersona = require("../modelos/modeloPersona");
const EnviarCorreo = require("../configuracion/correo");
const msj = require("../componentes/aviso");
const { validationResult } = require("express-validator");
const moment = require("moment");
const passport = require("../configuracion/passport");
const { Op } = require("sequelize");

exports.validarAutenticado = passport.validarAutenticado;

exports.lista = async (req, res) => {
    const listaSesiones = await modeloSesiones.findAll();
    console.log(listaSesiones);
    msj("Lista de Sesiones", 200, listaSesiones, res);
    //  console.log(listPersonas);
};

exports.guardar = async (req, res) => {
    const { usuarios_id, estado } = req.body;

    if (!usuarios_id || !estado) {
        msj(
            "No se enviaron los datos correctos",
            200,
            ["Falta el Id del usuario"],
            res
        );
        //console.log("El id es obligatorio");
        //res.send("El id es obligatorio");
    } else {
        await modeloSesiones
            .create({ ...req.body })
            .then((data) => {
                console.log(data);
                var info = "La Sesión se registro con éxito";
                res.send(info);
            })
            .catch((error) => {
                console.log(error);
                var info = "no se pudo guardar";
                res.send(info);
            });
    }

    //  console.log(listPersonas);
};

exports.RecuperarCorreo = async (req, res) => {
    const { correo } = req.body;
    const pin = "0703";
    const BuscarCorreo = await modeloUsuario.findOne({
        where: {
            correo: correo,
        },
    });

    if (!BuscarCorreo) {
        msj("No se encontró el correo electrónico", 200, [], res);
    } else {
        const BuscarPersona = await modeloPersona.findOne({
            where: {
                id: BuscarCorreo.personas_id
            }
        });
        const data = {
            nombre: BuscarPersona.nombre + " "+ BuscarPersona.apellido,
            correo: BuscarCorreo.correo,
            telefono: BuscarPersona.telefono,
            pin: pin,
        };
       const Result = EnviarCorreo.sendEmail(req,res,data);
        msj("Correo Enviado", 200, Result, res);
    }
};

exports.incioSesion = async (req, res, next) => {
    const validacion = validationResult(req);
    if (!validacion.isEmpty) {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res);
    } else {
        const { login, contrasena } = req.body;
        const BuscarUsuario = await modeloUsuario.findOne({
            where: {
                login: login,
            },
        });
        if (!BuscarUsuario) {
            msj("El Usuario no existe o se encuentra inactivo", 200, [], res);
        } else {
            if (
                !BuscarUsuario.VerificarContrasenia(
                    contrasena,
                    BuscarUsuario.contrasena
                )
            ) {
                msj("El Usuario no existe o contraseña invalida", 200, [], res);
            } else {
                const BuscarPersona = await modeloPersona.findByPk(
                    BuscarUsuario.personas_id
                );
                const DatosUsuario = {
                    Usuario: BuscarUsuario.login,
                    Nombre: BuscarPersona.nombre,
                    Apellido: BuscarPersona.apellido,
                    Correo_Electronico: BuscarUsuario.correo,
                };
                const token = passport.getToken({ id: BuscarUsuario.id });
                const data = {
                    token: token,
                    Usuario: DatosUsuario,
                };
                console.log(data);
                msj(
                    "Bienvenido, " + DatosUsuario.Nombre + " " + DatosUsuario.Apellido,
                    200,
                    data,
                    res
                );
            }
        }
    }
};

exports.ValidarToken = async (req, res) => {
    const { data } = req.body;
    //console.log(req);
    msj("Token invalido", 200, data, res);
};
exports.enviarToken = async (req, res) => {
    const { data } = req.body;
    res.status(200).json(data);
};
