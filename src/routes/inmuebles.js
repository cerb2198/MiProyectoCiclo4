const express = require("express");
routes = express.Router();

routes.get('/perfil', (req, res) => {
    //EJEMPLO DE COMO SE ENVIA A HANDLEBARS OBJETOS O LISTAS ITERABLES
    const objeto = [{
        nombre:'Carlos',
        edad: 23,
        tipo:'Vip'
    },
    {
        nombre:'Paola',
        edad: 22,
        tipo:'Vip'
    },
    {
        nombre:'Tamara',
        edad: 4,
        tipo:'Vip'
    },
    {
        nombre:'Luis',
        edad: 50,
        tipo:'Vip'
    }]

    res.render('./userLogueado/inmuebles', {objeto});
});

module.exports = routes;