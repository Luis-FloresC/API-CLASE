const { Router } = require('express');
const router = Router();
const controladorPersona = require('../controladores/controladorPersona');

router.get('/listar',controladorPersona.lista);


module.exports = router;