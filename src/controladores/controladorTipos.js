//Declramos la variable para utilizar el modelo
const modeloTipos = require("../modelos/modeloTipos");

//Metodo para obtner la lista de todos los registros de la base de datos
exports.lista = async (req, res) => {
    const listaTipos = await modeloTipos.findAll();
    res.json(listaTipos);
    //  console.log(listPersonas);
};

//Metodo para guardar los datos en nuestra base de datos
exports.guardar = async (req, res) => {
    const { nombre, activo, imagen } = req.body;

    if (!nombre || !activo) {
        console.log("El nombre o el estado son obligatorios");
        res.send("El nombre o el estado son obligatorios");
    } else {
        await modeloTipos
            .create({
                nombre,
                activo,
                imagen,
            })
            .then((data) => {
                console.log(data);
                var info =
                    "El Tipo: " + data.dataValues.nombre + " se registro con éxito";
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
    const { nombre, activo, imagen } = req.body;
    console.log(activo);
    if (!nombre || activo === "") {
        console.log("El nombre o el estado son obligatorios");
        res.send("El nombre o el estado son obligatorios");
    } else {
        const BuscarTipos = await modeloTipos.findOne({
            where: {
                id: id,
            },
        });

        if (!BuscarTipos) {
            res.send("El Tipo no se encuentra registrada");
        } else {
            BuscarTipos.nombre = nombre;
            BuscarTipos.activo = activo;
            if (imagen) {
                BuscarTipos.imagen = imagen;
            }

            await BuscarTipos.save()
                .then((data) => {
                    console.log(data);
                    var info =
                        "El Tipo: " +
                        data.dataValues.nombre +
                        " se actualizaron los datos con éxito";
                    res.send(info);
                })
                .catch((error) => {
                    console.log(error);
                    res.send("Ocurrió un error");
                });
        }
    }
};

exports.ELiminar = async (req, res) => {
   const { id } = req.query;


   if (!id) {
      console.log("Todos los campos son obligatorios");
      res.send("Todos los campos son obligatorios");
   } else {
      const BuscarTipos = await modeloTipos.findOne({
         where: {
            id: id,
         },
      });

      if (!BuscarTipos) {
         res.send("El Tipo no se encuentra registrado");
         console.log("El Tipo no se encuentra registrado");
      } else {

         await BuscarTipos.destroy({
            where:{
               id:id
            }
         }).then((data) => {
               console.log(data);
               var info =
                  "El tipo: " +
                  data.dataValues.nombre +
                  " se eliminaron los datos con éxito";
               res.send(info);
            })
            .catch((error) => {
               console.log(error);
               res.send("Ocurrió un error");
            });
      }
   }
};


