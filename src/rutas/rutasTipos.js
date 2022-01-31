const { Router } = require('express');
const router = Router();
const controladorTipos = require('../controladores/controladorTipos');

//Ruta Get para obtener la
//lista de las personas alamcenadas en nuestra base de datos
router.get('/listar',controladorTipos.lista);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.post('/guardar',controladorTipos.guardar);

/*
Ruta post para guardar los datos en la base de datos en la tabla de personas
*/
router.put('/editar',controladorTipos.Editar);

//Ruta delete para eliminar una persona
router.delete('/eliminar',controladorTipos.ELiminar);

//Se exportan las rutas de las personas
module.exports = router;