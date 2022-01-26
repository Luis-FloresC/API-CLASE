const modeloPersona = require('../modelos/modeloPersona');

//Metodo para mostrar los numeros del 1-10
exports.raiz = (req, res) => {
    var m = "";
    var c = 0;

    for (c = 1; c <= 10; c++) {
        m = m + c + "\n";
    }
    res.send(m);
    console.log(m);
};

//Metodo para mostrar la lista de personas existentes en nuestra base de datos
exports.lista = async (req,res) =>{
   const listPersonas = await modeloPersona.findAll();
   res.json(listPersonas);
   console.log(listPersonas);
};