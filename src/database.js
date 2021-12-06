const mongoose = require('mongoose');

const URI_MONGO = 'mongodb+srv://Carlos98:Carlos98@cluster0.hegwt.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URI_MONGO, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(db => console.log("Conexion exitosa."))
.catch(err => console.log(err));