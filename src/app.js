const express = require('express');
const morgan = require('morgan');
const app = express();

app.set('port', process.env.PORT || 4001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('json spaces', 2);


app.use('/api/', require('./rutas/index'));
app.use('/api/personas/', require('./rutas/rutasPersonas'));


app.listen(app.get('port'), () => {
  console.log('Servidor iniciado en el puerto:', app.get('port'));
});