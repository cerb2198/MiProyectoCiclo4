const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*REGISTRO DE USUARIO EN LA BD*/
const InmuebleSchema = new Schema({
    userCreador:{type:String, required:true},
    ubicacion:{type:String, required:true},
    precio:{type:Number, required:true},
    habitaciones:{type:Number, required:true},
    tipoApto:{type:String, required:true},
    descripcion:{type:String, required:true},
    antiguedad:{type:Number, required:false},
    imagenURL:{type:String, required:true},
    date:{type:Date, default: Date.now}
});


module.exports = mongoose.model('inmuebles', InmuebleSchema);