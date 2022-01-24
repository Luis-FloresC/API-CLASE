const modeloPersona = require('../modelos/modeloPersona');



exports.lista = async (req,res) =>{
   const listPersonas = await modeloPersona.findAll();
   res.json(listPersonas);
   console.log(listPersonas);
};