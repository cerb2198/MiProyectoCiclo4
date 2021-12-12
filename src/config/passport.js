const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const modeloUsuario = require('../model/User');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    modeloUsuario.findById(id, (err, user) => {
        done(err, user);
    });
});

passport.use('local', new LocalStrategy(
    {usernameField: 'email', passwordField: 'password'},
    async (email, password, done) => {
        //Comprobar si existe el correo del usuario
        const user = await modeloUsuario.findOne({email})
        if(!user){
            return done(null,false,{message: 'Usuario no registrado.'});
        }
        else{
            //comprobar contraseña de usuario
            const compara = await user.comparaContrasena(password);
            if(compara){
                return done(null,user);
            }
            else{
                return done(null,false,{message: 'La contraseña es incorrecta.'})
            }
        }
    }
));
