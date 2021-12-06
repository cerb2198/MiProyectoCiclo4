const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*REGISTRO DE USUARIO EN LA BD*/
const InmuebleSchema = new Schema({
    Ubicacion:{type:String, required:true},
    Precio:{type:String, required:true},
    Habitaciones:{type:String, required:true},
    TipoApto:{type:String, required:true},
    imagenURL:{type:String, required:true},
    date:{type:Date, default: Date.now}
});


module.exports = mongoose.model('Inmueble', InmuebleSchema);