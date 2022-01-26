//Declramos la variable para utilizar el modelo 
const modeloPersona = require("../modelos/modeloPersona");

//Metodo para obtner la lista de todos los registros de la base de datos
exports.lista = async (req, res) => {
   const listPersonas = await modeloPersona.findAll();
   res.json(listPersonas);
   //  console.log(listPersonas);
};

//Metodo para guardar los datos en nuestra base de datos
exports.guardar = async (req, res) => {
   const { id, nombre, apellido, telefono, estado, imagen } = req.body;

   if (!nombre || !apellido) {
      console.log("El nombre o el apellido son obligatorios");
      res.send("El nombre o el apellido son obligatorios");
   } else {
      await modeloPersona
         .create({
            id,
            nombre,
            apellido,
            telefono,
            estado,
            imagen,
         })
         .then((data) => {
            console.log(data);
            var info =
               "La persona: " +
               data.dataValues.nombre +
               " " +
               data.dataValues.apellido +
               " se registro con éxito";
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

//Metodo para editar datos de algun registro en especifico
exports.Editar = async (req, res) => {
   const { id } = req.query;
   const { nombre, apellido, telefono, estado, imagen } = req.body;

   if (!id || !nombre || !apellido) {
      console.log("Todos los campos son obligatorios");
      res.send("Todos los campos son obligatorios");
   } else {
      const BuscarPersona = await modeloPersona.findOne({
         where: {
            id: id,
         },
      });

      if (!BuscarPersona) {
         res.send("La persona no se encuentra registrada");
      } else {
         BuscarPersona.nombre = nombre;
         BuscarPersona.apellido = apellido;
         if (telefono) {
            BuscarPersona.telefono = telefono;
         }
         else if (estado) {
            BuscarPersona.estado = estado;
         }
         else if (imagen) {
            BuscarPersona.imagen = imagen;
         }


         await BuscarPersona.save()
            .then((data) => {
               console.log(data);
               var info =
                  "La persona: " +
                  data.dataValues.nombre +
                  " " +
                  data.dataValues.apellido +
                  " se actualizaron los datos con éxito";
               res.send(info);
            })
            .catch((error) => {
               console.log(error);
               res.send("Ocurrio un error");
            });
      }
   }
};
