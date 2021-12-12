const express = require("express");
routes = express.Router();
const User = require("../model/User");
const { Router } = require("express");
const bcrypt = require("bcryptjs");
const passport = require('passport');


//VISTA DE REGISTRO
routes.get('/singin',(req, res) => {
    res.render('forms/formularioSingin');
});

//ACCION DE REGISTRO
routes.post('/singin', async (req, res) => {

    //ACA LO GUARDO EN 3 VARIABLES
    const {user,email,sobrenombre,password} = req.body;

    var errores =["Tiene que ingresar un usuario", "Tiene que ingresar un e-mail", "Contraseña no ingresada", "Usuario ya registrado"]

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
        res.cookie("erroresSingin", errorUsuario, {httpOnly:true});
        res.redirect('/registroIncorrecto');
    }
    else{
        const consultaSingin = await User.findOne({email:email});
        if(consultaSingin === null)
        {
            const newUser = new User({user, email, sobrenombre, password});
            newUser.password = await newUser.encriptaContrasena(password);
            await newUser.save();
            console.log("USUARIO REGISTRADO");
            res.redirect('/registroExitoso');
        }
        else{
            errorUsuario.push(errores[3]);
            res.cookie("erroresSingin", errorUsuario, {httpOnly:true});
            res.redirect('/registroIncorrecto');
        }  
    }

});

//ESTO SE ENCARGA DE REDIRIGIR A INCIO DE SESION
routes.get('/registroExitoso', (req,res) => {
    res.render('forms/formularioLogin');
});

//ES UNA VISTA QUE MUESTRA AL USUARIO ALGUNOS ERRORES DEL REGISTRO...
routes.get('/registroIncorrecto', (req,res) => {
    var errorRegistro = req.cookies["erroresSingin"];
    res.clearCookie("erroresSingin", {httpOnly:true});
    res.render('others/vistaErrorSingIn', {errorRegistro});
});

//VISTA DE INICIO DE SESION
routes.get('/login', (req, res) => {
    res.render('forms/formularioLogin');
});

//ACCION DE INICIO DE SESION
routes.post('/login', (req, res, next) => {
    const {email,password} = req.body;
    var errores = ["Email no ingresado", "Contraseña no ingresada"];
    var errLogin = [];
    if(email.length<=0)
    {
        errLogin.push(errores[0]);
    }
    if(password.length<=0)
    {
        errLogin.push(errores[1]);
    }

    res.cookie("erroresLogin", errLogin, {httpOnly:true});
    next();
}, passport.authenticate('local', {
    successRedirect: '/perfil',
    failureRedirect: '/inicioIncorrecto',
    passReqToCallback: true
}));

//ES UNA VISTA QUE MUESTRA AL USUARIO ALGUNOS ERRORES DEL INICIO DE SESION...
routes.get('/inicioIncorrecto', (req,res) => {
    var errorLogin = req.cookies["erroresLogin"];
    res.clearCookie("erroresLogin", {httpOnly:true});
    res.render('others/vistaErrorLogin', {errorLogin});
});

//ACCION A EJECUTAR CUANDO LA RUTA SEA LOGOUT
routes.get('/logout', (req,res) => {
    req.logout();
    res.redirect("/");
})

// FUNCION DE AUTENTICACION
function isAuthenticated(req, res, next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/login');
}

module.exports = routes;