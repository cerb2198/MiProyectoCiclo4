const express = require("express");
const path = require("path");
routes = express.Router();

routes.get('/', (req, res) => {
    res.render('index');
});

routes.get('/about', (req, res) => {
    res.render('about');
});

module.exports = routes;