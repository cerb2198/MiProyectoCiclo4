const express = require("express");
routes = express.Router();
const rutaUser = require("./users");
//LOS ESQUEMAS QUE REQUERIMOS:
const modeloInmueble = require("../model/Inmueble");
const modeloUsuario = require("../model/User");
const modeloFavoritos = require("../model/Favoritos");
const { findOneAndUpdate } = require("../model/User");

routes.get('/perfil', isAuthenticated,async (req, res) => {
    //EJEMPLO DE COMO SE ENVIA A HANDLEBARS OBJETOS O LISTAS ITERABLES
    const listaInmuebles = await modeloInmueble.find({}).lean();
    const nombreUsuarioLog = req.user;
    console.log("El tipo del objectID es: ", typeof nombreUsuarioLog.id);
    // CONCLUSION: ESTA PROPIEDAD DE .id DEVUELVE UN STRING
    res.render('userLogueado/inmuebles', {listaInmuebles, nombreUsuarioLog});
});

//GET Y POST DE AÑADIR INMUEBLES
routes.get('/addInmueble', isAuthenticated, async (req,res) => {
    res.render('forms/agregaInmueble');
});

//Añadir a la lista de favoritos
routes.post('/addInmueble', isAuthenticated, async (req,res) => {
    //AÑADIMOS AL INMUEBLE EL USUARIO QUE LO CREO ESTO PARA QUE EL USUARIO ELIMINE SOLO
    //LO QUE EL CREA.
    const userCreador = req.user.id;
    var {ubicacion, precio, habitaciones, tipoApto, descripcion, antiguedad, imagenURL} = req.body;
    /*RECONVIRTIENDO DATOS SEGÚN LA NECESIDAD EN EL SCHEMA*/
    precio = parseInt(precio);
    habitaciones = parseInt(habitaciones);
    antiguedad = parseInt(antiguedad);
    //GUARDAMOS EL OBJETO
    const nuevoInmueble = new modeloInmueble({userCreador, ubicacion, precio, habitaciones, tipoApto, descripcion, antiguedad, imagenURL});
    await nuevoInmueble.save();
    res.redirect('/perfil');
});

//GET Y POST DE ELIMINAR INMUEBLES (YA ESTA)
routes.get('/deleteInmueble', isAuthenticated, async (req,res) => {
    /*NECESITAMOS LANZAR UN OBJETO A LA VISTA DE HANDLEBARS
    QUE CONTENGA SOLAMENTE LOS INMUEBLES CREADOS POR EL USUARIO*/
    const consultaDelete = await modeloInmueble.find({userCreador:req.user.id}).lean();
    res.render('forms/eliminaInmueble', {consultaDelete});
});


routes.post('/deleteInmueble', isAuthenticated, async (req,res) => {
    const {idInmueble} = req.body;
    console.log("ID del inmueble a eliminar: ", idInmueble);
    await modeloInmueble.findByIdAndDelete(idInmueble);
    res.redirect('/perfil');
});

//EL POST '/editInmueble' REDIRIGE A ESTA VISTA DE EDICIÓN
routes.get('/viewEdit', isAuthenticated,async (req,res) => {
    //CARGAMOS LA COOKIES ASOCIADAS AL INMUEBLE A EDITAR
    var idEditInmueble = req.cookies["idInmuebleEditar"];

    const consultaEdit = await modeloInmueble.findOne({_id: idEditInmueble.inmuebleId}).lean();
    console.log("El objeto consultado para modificar es:", consultaEdit);
    res.render('forms/editarInmueble', {consultaEdit});
});

//POST PARA EDITAR INMUEBLE
routes.post('/editInmueble/editado', isAuthenticated,async (req,res) => {
    var idEditInmueble = req.cookies["idInmuebleEditar"];
    
    const {ubicacion, precio, habitaciones, tipoApto, descripcion, antiguedad, imagenURL} = req.body;

    const update ={
        ubicacion: ubicacion,
        precio: precio,
        habitaciones: habitaciones,
        tipoApto: tipoApto,
        descripcion: descripcion,
        antiguedad: antiguedad,
        imagenURL: imagenURL
    }

    await modeloInmueble.findOneAndUpdate({_id: idEditInmueble.inmuebleId},update);

    res.clearCookie("idInmuebleEditar", {httpOnly:true});

    res.redirect('/perfil');
});

routes.post('/editInmueble', isAuthenticated, (req,res) => {
    const idEditInmueble = req.body; //RECIBIMOS EL ID DEL INMUEBLE
    res.cookie("idInmuebleEditar", idEditInmueble, {httpOnly:true}); //ALMACENAMOS EL ID EN MEMORIA VOLATIL
    res.redirect('/viewEdit');
});

//FUNCIONALIDAD DE AÑADIR A FAVORITOS Y MOSTRAR LA PAGINA DE FAVORITOS

/*ANTES DE ESTO SE TIENE QUE REGISTRAR EN LA BD LOS INMUEBLES FAVORITOS MEDIANTE UN POST*/
routes.get('/perfil/favoritos', isAuthenticated, async (req,res) => {
    //CONSULTAMOS LOS FAVORITOS DE ESTE USUARIO
    const userFavoritos = await modeloFavoritos.find({user:req.user.user}).lean();
    res.render('userLogueado/inmueblesFav', {userFavoritos});
})
//Añade a favoritos
routes.post('/perfil/favoritos', isAuthenticated, async (req,res) => {
    const user = req.user.user;
    const {inmuebleId, ubicacion, precio, habitaciones, tipoApto, descripcion, antiguedad, imagenURL} = req.body;
    const nuevoFavorito = new modeloFavoritos({user, inmuebleId, ubicacion, precio, habitaciones, tipoApto, descripcion, antiguedad, imagenURL});
    await nuevoFavorito.save();
    //OJO VENGA ACA DESPUES Y MODIFIQUE PARA QUE REDIRIJA A LISTA DE FAVORITOS.
    res.redirect('/perfil');
});
//Remueve de favoritos
routes.post('/perfil/remueveFavoritos', isAuthenticated, async (req,res) => {
    const {inmuebleId} = req.body;
    await modeloFavoritos.findByIdAndDelete(inmuebleId);
    res.redirect('/perfil/favoritos');
});

// FUNCION DE AUTENTICACION
function isAuthenticated(req, res, next){
    if(req.isAuthenticated())
    {
        return next();
    }
    res.redirect('/login');
}

module.exports = routes;