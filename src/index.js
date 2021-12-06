const express = require("express");
const app = express();
const path = require("path");
const exphbs = require('express-handlebars');
const methodOverride = require("method-override");
const session = require("express-session");

require('./database');

//SETTINGS
/*Configruaciones del servidor*/
app.set("port", process.env.PORT || 8000);
app.set("views", path.join(__dirname, 'views'));
console.log(path.join(__dirname, 'views'));

/*Se configura lo relacionado a handlebars*/
app.engine('.hbs', exphbs({
    defaultLayout: 'layouts/main.hbs',
    layoutsDir: app.get('views'),   
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

/*Se añade la configuracion a express con el nombre 'view engine'*/
app.set('view engine','.hbs');

//MIDDLEWARE
/*Aca viene todo lo que se necesita que se ejecute antes del servidor, o cuando llegan al servidor pero
antes de que llegen a las rutas*/

app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true 
}));
console.log("1. Acá llega bien (final del middleware).")


//VARIABLES GLOBALES
/*Se usara esta seccion para nombrar variables que se requieran que permanezcan a lo largo de la app*/

//ROUTES
/*Se establecen las rutas del proyecto*/
app.use(require('./routes/index.js'));
app.use(require('./routes/inmuebles.js'));
app.use(require('./routes/users.js'));

//STATIC FILES
/*Todos aquellos archivos que son estaticos y que se quieren pintar*/
app.use(express.static(path.join(__dirname, 'public')));

//SERVER
/*Acá se inicia el servidor*/
app.listen(app.get("port"), () => {
    console.log("Se esta recibiendo señal por el puerto", app.get("port"));
});