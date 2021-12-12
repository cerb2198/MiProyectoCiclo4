const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaFavoritos = new Schema({
    user: {type: String, required: true},
    inmuebleId: {type: String, required: true},
    ubicacion:{type:String, required:true},
    precio:{type:Number, required:true},
    habitaciones:{type:Number, required:true},
    tipoApto:{type:String, required:true},
    descripcion:{type:String, required:true},
    antiguedad:{type:Number, required:false},
    imagenURL:{type:String, required:true}
});

module.exports = mongoose.model('Favoritos', SchemaFavoritos );