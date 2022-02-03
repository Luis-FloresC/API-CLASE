const mensaje = ( msj, estado, data, res) =>{
    var aviso={
        msj: msj,
        data: data
    };
    res.setHeader("Content-Type", "application/json");
    res.statusCode=estado;
    res.json(aviso);
};
module.exports = mensaje;