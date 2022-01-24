const modeloPersona = require('../modelos/modeloPersona');

exports.raiz = (req, res) => {
    var m = "";
    var c = 0;

    for (c = 1; c <= 10; c++) {
        m = m + c + "\n";
    }
    res.send(m);
    console.log(m);
};

exports.lista = async (req,res) =>{
   const listPersonas = await modeloPersona.findAll();
   res.json(listPersonas);
   console.log(listPersonas);
};