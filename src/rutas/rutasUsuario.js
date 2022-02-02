const { Router } = require('express');
const router = Router();
const controladorUsuario = require('../controladores/controladorUsuario');

//Ruta Get para obtener la
//lista de las personas alamcenadas en nuestra base de datos
router.get('/listar',controladorUsuario.lista);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.post('/guardar',controladorUsuario.guardar);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.put('/editar',controladorUsuario.Editar);

//Ruta delete para eliminar una persona
router.delete('/eliminar',controladorUsuario.ELiminar);

//Se exportan las rutas de las personas
module.exports = router;