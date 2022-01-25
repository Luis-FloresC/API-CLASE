const { Router } = require('express');
const router = Router();
const controladorPersona = require('../controladores/controladorPersona');

router.get('/listar',controladorPersona.lista);
router.post('/guardar',controladorPersona.guardar);
router.put('/editar',controladorPersona.Editar);

module.exports = router;