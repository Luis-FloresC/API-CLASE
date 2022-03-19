const fs = require('fs');
const path = require('path');
const msj = require('../componentes/aviso');
const modeloPersona = require('../modelos/modeloPersona');

exports.Recibir = async (req, res) => {
    try {
        const { img } = req.file;
        const {id} = req.query;
        console.log(img);
        var BuscarPersona = await modeloPersona.findByPk(id);

        if (!BuscarPersona) {
            msj("Persona no encontrada", 200, [], res);
        }
        else {
            try {
                const BuscarImagen = fs.existsSync(path.join(__dirname, '../public/img/' + BuscarPersona.imagen));
                if (!BuscarImagen) {
                    msj("No se encontró la imagen en el server", 200, [], res);
                }
                else {
                    try {
                        fs.unlinkSync(path.join(__dirname, '../public/img/' + BuscarPersona.imagen));
                        msj("se elimino la imagen en el server", 200, [], res);
                    } catch (error) {
                        res.status(500).json({ error: error.toString() });
                    }

                }
            } catch (error) {
                res.status(500).json({ error: error.toString() });
            }
        }

        
        /*
        BuscarPersona.imagen = img;
        await BuscarPersona.save()
            .then((data) => {
                console.log(data);
                var info = "Imagen Actualizada";
                msj(info,200,data,res);
            })
            .catch((error) => {
                console.log(error);
               msj(error,200,[],res);
            });
            */
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

};