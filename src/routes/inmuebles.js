const express = require("express");
routes = express.Router();

routes.get('/ok', (req, res) => {
    res.render('/singin')
});

routes.post('/notes/new-note', (req, res) => {
    console.log(req.body);
});

routes.get('/okk', (req, res) => {
    res.send("Aca deberia estar el formulario de singup");
});

module.exports = routes;