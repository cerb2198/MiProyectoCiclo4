const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

/*REGISTRO DE USUARIO EN LA BD*/
const UserSchema = new Schema({
    user:{type:String, required:true},
    email:{type:String, required:true},
    sobrenombre:{type:String, required:false},
    password:{type:String, required:true},
    date:{type:Date, default: Date.now}
});

UserSchema.methods.encriptaContrasena = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt);
}

UserSchema.methods.comparaContrasena = async function(password) {
    return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('Usuario', UserSchema);