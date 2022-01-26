const { Router } = require('express');
const router = Router();
const controladorPersona = require('../controladores/controladorPersona');

//Ruta Get para obtener la
//lista de las personas alamcenadas en nuestra base de datos
router.get('/listar',controladorPersona.lista);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.post('/guardar',controladorPersona.guardar);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.put('/editar',controladorPersona.Editar);

//Se exportan las rutas de las personas
module.exports = router;