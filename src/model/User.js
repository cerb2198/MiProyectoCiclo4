const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*REGISTRO DE USUARIO EN LA BD*/
const UserSchema = new Schema({
    user:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    sobrenombre:{type:String, required:false},
    date:{type:Date, default: Date.now}
});

module.exports = mongoose.model('Usuario', UserSchema);