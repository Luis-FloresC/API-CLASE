//Declaracion de Variables 
const express = require('express');
const morgan = require('morgan');
const app = express();
const passport = require('passport');
//Asignacion del puerto a utilizar
app.set('port', process.env.PORT || 4001);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 2);
app.use(passport.initialize());
//Declaramos las rutas que vamos a usar
app.use('/api/', require('./rutas/index'));
app.use('/api/personas/', require('./rutas/rutasPersonas'));
app.use('/api/tipos/', require('./rutas/rutasTipos'));
app.use('/api/usuario/', require('./rutas/rutasUsuario'));
app.use('/api/usuario/login/', require('./rutas/rutasLogin'));

//Inicializamos el servidor
app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto:', app.get('port'));
});