const express = require("express");
routes = express.Router();
const User = require("../model/User");


routes.get('/singin',(req, res) => {
    res.render('forms/formularioSingin');
});

routes.post('/singin', async (req, res) => {

    //ACA LO GUARDO EN 3 VARIABLES
    const {user,email,sobrenombre,password} = req.body;

    var errores =["Tiene que ingresar un usuario", "Tiene que ingresar un e-mail", "Contraseña no ingresada"]

    //VALIDACION RAPIDA DE QUE ESTAN METIENDO LOS DATOS IMPORTANTES.
    var errorUsuario = [];

    if(user.length <= 0)
    {
        errorUsuario.push(errores[0]);
    }
    if(email.length <= 0)
    {
        errorUsuario.push(errores[1]);
    }
    if(password.length <= 0)
    {
        errorUsuario.push(errores[2]);
    }

    if(errorUsuario.length>0)
    {
        res.cookie("errores", errorUsuario, {httpOnly:true});
        res.redirect('/registroIncorrecto');
    }
    else{
        const newUser = new User({user, email, sobrenombre, password});
        await newUser.save();
        res.redirect('/registroExitoso');
    }

});

//ES UNA VISTA EN DONDE ME DEBE REDIGIR EN UN FUTURO A LOS INMUEBLES DISPONIBLES.
routes.get('/registroExitoso', (req,res) => {
    res.send("USUARIO ALMACENADO EXITOSAMENTE...");
});

//ES UNA VISTA QUE MUESTRA AL USUARIO ALGUNOS ERRORES DEL REGISTRO...
routes.get('/registroIncorrecto', (req,res) => {
    var errorRegistro = req.cookies["errores"];
    res.clearCookie("errores", {httpOnly:true});
    console.log(errorRegistro);
    res.render('others/vistaErrorSingIn', {errorRegistro});
});


routes.get('/login',(req, res) => {
    res.render("forms/formularioLogin");
});

module.exports = routes;