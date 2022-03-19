
const msj = require('../componentes/aviso');
const nodemailer = require('nodemailer');


exports.sendEmail = async function (req, res,data) {
    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user:  process.env.correo_app,
            pass:  process.env.correo_contrasenia
        }
    });

    const contentHTML = `     
    <div>
    <h1>Sistema Medi</h1>
    <ul>
        <li>Nombre: ${data.nombre}</li>
        <li>Correo: ${data.correo}</li>
        <li>Teléfono: ${data.telefono}</li>
        <li>Pin de Recuperación: ${data.pin}</li>
    </ul>
    <p>Nota: con este pin puede cambiar su contraseña solo una vez...</p>
    </div>`;
    // Definimos el email
    var mailOptions = {
        from: process.env.correo_app,
        to: data.correo,
        subject: 'Recuperación de Contraseña',
        html:  contentHTML
    };
    // Enviamos el email
    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send(error.message);
        } else {
            console.log("Email sent");
            res.status(200).json(req.body);
        }
    });
};


exports.recuperarContrasena = async (data) => {

    try {

        /*
        const configCorreo = {
            from: process.env.correo_app,
            to: data.correo,
            subject: "Recuperación de Contraseña",
            text: "Pin: " + data.pin
        };

        const transport = nodemailer.createTransport(
            {
                host: process.env.correo_servicio,
                port: process.env.correo_port,
                secure: true,
                auth: {
                    user: process.env.correo_app,
                    pass: process.env.correo_contrasena
                },
            }
        );
            try {
                await transport.verify(async function (error, sucess) {
                    if (error) {
        
                       console.log("No se pudo enviar",error);
                        return false;
                    }
                    else {
                        console.log("El servidor puede enviar");
        
                    }
                });
            } catch (error) {
                console.log(error.toString());
            }
   

        return await transport.sendMail(configCorreo);
        */
    } catch (error) {
        console.log(error.toString());
    }
};
