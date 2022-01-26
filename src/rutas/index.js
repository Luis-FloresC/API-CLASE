//Declaracion de la varaible router que obtenemos del paquete de 
// express
const { Router } = require('express');
const router = Router();
//Importamos la configuracion del controlador raiz
const controladorRaiz = require('../controladores/controladorInicio');
/*
Declaracion del methodo get para la ruta raiz donde deveulve
un Hola como respuesta.
*/
router.get('/',(req,res)=>{
    console.log("Hola");
    res.send("Hola");
});

//Ruta que utiliza el controlador raiz que devulve una lista 
router.get('/lista',controladorRaiz.lista);

/*
Ruta que devuelve los numeros del 1-10 utilizando una función de methodo get
*/
router.get('/raiz', controladorRaiz.raiz);

//Exportamos la configuracion de las rutas principales
module.exports = router;