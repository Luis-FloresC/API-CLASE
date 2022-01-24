const { Router } = require('express');
const router = Router();
const controladorRaiz = require('../controladores/controladorInicio');
router.get('/',(req,res)=>{
    console.log("Hola");
    res.send("Hola");
});

router.get('/lista',controladorRaiz.lista);

router.get('/raiz', controladorRaiz.raiz);

module.exports = router;