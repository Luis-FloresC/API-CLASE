const { Router } = require('express');
const router = Router();
const controladorUsuario = require('../controladores/controladorUsuario');
const controladorAuth = require('../controladores/controladorSesiones');
const {body ,query } = require('express-validator');
//Ruta Get para obtener la
//lista de las personas alamcenadas en nuestra base de datos
router.get('/listar',controladorAuth.validarAutenticado,controladorUsuario.lista);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.post('/guardar',
body('login').isLength({min:5}).withMessage('La Longitud minima es de 3 caracteres'),
body('correo').isEmail().withMessage('Ingrese un Correo Electrónico Valido'),
body('contrasena').isLength({min:8}).withMessage('La contraseña debe ser de 8 caracteres'),
body('personas_id').isInt().withMessage('Debe enviar el id de la persona'),
controladorUsuario.guardar);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.put('/editar',controladorUsuario.Editar);

//Ruta delete para eliminar una persona
router.delete('/eliminar',controladorUsuario.ELiminar);

//Se exportan las rutas de las personas
module.exports = router;