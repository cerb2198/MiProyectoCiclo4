const express = require("express");
routes = express.Router();
const User = require("../model/User");

routes.get('/singin',(req, res) => {
    res.render('forms/formularioSingin');
});

routes.post('/singin', async (req, res) => {
    console.log("INGRESA");
    //ACA LO GUARDO EN 3 VARIABLES
    const {user,email,sobrenombre,password} = req.body;
    console.log("Su apodo es:", sobrenombre);
    const newUser = new User({user, email, sobrenombre, password});
    await newUser.save();
    res.redirect('/registroExitoso');
});

routes.get('/registroExitoso', (req,res) => {
    res.send("USUARIO ALMACENADO EXITOSAMENTE...");
});

routes.get('/login',(req, res) => {
    res.render("forms/formularioLogin");
});

module.exports = routes;