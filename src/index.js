const express = require("express");
const app = express();
const path = require("path");
const exphbs = require('express-handlebars');
const methodOverride = require("method-override");
const session = require("express-session");
var cookieParser = require('cookie-parser');
const passport = require('passport');



require('./database');
require('./config/passport');

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
/*Esta libreria cookie-Parser nos permite poder trabajar la persistencia de algunos
datos que necesito que duren un rato en memoria, especialmente util cuando necesito que algunos datos
persistan cuando uso el metodo res.redirect()*/
app.use(cookieParser());
app.use(methodOverride('_method'));

const filestore = require("session-file-store")(session)

app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true 
}));

app.use(passport.initialize());
app.use(passport.session());


//VARIABLES GLOBALES
/*Se usara esta seccion para nombrar variables que se requieran que permanezcan a lo largo de la app*/

app.use((req,res,next) =>{
    app.locals.user = req.user || null;  
    next();
});



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
