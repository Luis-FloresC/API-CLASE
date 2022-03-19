const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const { finished } = require('stream');

const storage = multer.diskStorage({
    destination: function (req,res,cb)
    {
        cb(null,path.join(__dirname,'../public/img'));
    },
    filename: function(req,file,cb)
    {
        const unico = Date.now() + '-' +Math.round(Math.random() * 1E9);
        cb(null,file.filename + "-"+ unico + file.mimetype.replace("/","."));
    }
});
const upload = multer({
    storage: storage,
});
//Importamos la configuracion del controlador raiz
const controladorArchivo = require('../controladores/controladorArchivos');

router.post('/img',upload.single('img'),controladorArchivo.Recibir);

module.exports = router;