const { Router } = require('express');
const router = Router();
const controladorSesiones = require('../controladores/controladorSesiones');
const {body ,query } = require('express-validator');
//Ruta Get para obtener la
//lista de las personas alamcenadas en nuestra base de datos
router.get('/listar',controladorSesiones.lista);

router.post('/guardar',controladorSesiones.guardar);


router.post('/iniciosesion',
    body('login')
    .isEmpty().withMessage('Debe enviar los datos del usuario correo o login'),
    body('contrasena')
    .isEmpty().withMessage('Debe enviar los datos del usuario correo o logi'),
    controladorSesiones.incioSesion,
);

router.post('/recuperarContrasena',controladorSesiones.RecuperarCorreo);

router.get('/error/', controladorSesiones.ValidarToken);

module.exports = router;