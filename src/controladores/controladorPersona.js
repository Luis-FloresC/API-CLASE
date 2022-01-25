const modeloPersona = require('../modelos/modeloPersona');



exports.lista = async (req,res) =>{
   const listPersonas = await modeloPersona.findAll();
   res.json(listPersonas);
 //  console.log(listPersonas);
};

exports.guardar = async (req,res) =>{

   const {id,nombre,apellido,telefono,estado,imagen} = req.body;

   if(!nombre || !apellido)
   {
      console.log("El nombre o el apellido son obligatorios");
      res.send("El nombre o el apellido son obligatorios");
   }
   else
   {
      await modeloPersona.create({
            id,
            nombre,
            apellido,
            telefono,
            estado,
            imagen
      })
         .then((data) => {
            console.log(data);
            var info = ("La persona: " + data.dataValues.nombre + " " + data.dataValues.apellido + " se registro con éxito");
            res.send(info);
         })
         .catch((error) => {
            console.log(error);
            var info = "no se pudo guardar";
            res.send(info);
         });
   }
  

 //  console.log(listPersonas);
};

exports.Editar = async (req,res) => 
{
   const {id} = req.query;
   const {nombre,apellido,telefono,estado,imagen} = req.body;
   const BuscarPersona = await modeloPersona.findOne({
      where: {
         id: id
      }
   });
   console.log(BuscarPersona);
   res.send(id);
};