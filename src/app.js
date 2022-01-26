//Declaracion de Variables 
const express = require('express');
const morgan = require('morgan');
const app = express();

//Asignacion del puerto a utilizar
app.set('port', process.env.PORT || 4001);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 2);

//Declaramos las rutas que vamos a usar
app.use('/api/', require('./rutas/index'));
app.use('/api/personas/', require('./rutas/rutasPersonas'));

//Inicializamos el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto:', app.get('port'));
});