//Declramos la variable para utilizar el modelo
const modeloUsuario = require("../modelos/modeloUsuario");


//Metodo para obtner la lista de todos los registros de la base de datos
exports.lista = async (req, res) => {
    const listaUsuarios = await modeloUsuario.findAll();
    console.log(listaUsuarios);
    res.json(listaUsuarios);
    //  console.log(listPersonas);
};


//Metodo para guardar los datos en nuestra base de datos
exports.guardar = async (req, res) => {
    const { personas_id, login, correo, contrasena, estado, fallidos, pin, tipo } = req.body;

    if (!personas_id || !login || !correo || !contrasena) {
        console.log("Todos los campos son obligatorios");
        res.send("Todos los campos son obligatorios");
    } else {
        await modeloUsuario
            .create({ ...req.body })
            .then((data) => {
                console.log(data);
                var info =
                    "El Usuario: " + data.dataValues.login + " se registro con éxito";
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

exports.Editar = async (req, res) => {
    const { id } = req.query;
    try {
        console.log(id);

        const existsUsuario = await modeloUsuario.findByPk(id);
        console.log(existsUsuario);
        if (!existsUsuario) {
            throw new Error(`No se encontró la persona con el id ${id}`);
        }

        await existsUsuario.update({ ...req.body });
        res.json({
            mensaje: "Registro actualizado",
            ID: id,
            DatosActualizados: req.body,
            DatosAnteriores: existsUsuario
        });

    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};


/*
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

*/


exports.ELiminar = async (req, res) => {
   const { id } = req.query;


   if (!id) {
      console.log("Se enviaron los datos incompletos...");
      res.send("Se enviaron los datos incompletos...");
   } else {
      const BuscarUsuario = await modeloUsuario.findByPk(id);

      if (!BuscarUsuario) {
         res.send("El Usuario no se encuentra registrado");
         console.log("El Usuario no se encuentra registrado");
      } else {

         await BuscarUsuario.destroy({
            where:{
               id:id
            }
         }).then((data) => {
               console.log(data);
               var info =
                  "El Usuario: " +
                  data.dataValues.login +
                  " se elimino con éxito";
               res.send(info);
            })
            .catch((error) => {
               console.log(error);
               res.send("Ocurrió un error");
            });
      }
   }
};

