//EMPEZAMOS DECLARANDO DOS VALORES, LA CLAVE ALMACENADA Y LA CLAVE INGRESADA.

const clave = "Carlos98#";

const ingresado = "Carlos98#";


var hashClave;

//COMPROBAMOS SI SON IGUALES O NO.
console.log("La comparacion es: ", clave === ingresado);

const encriptador = require('bcryptjs');

encriptador.hash(clave, 10, async function(err, hash){
    hashClave = hash;
    console.log("1. Este es el hash de la clave: ", hashClave);
});

encriptador.compare(ingresado, hashClave, async function(err, result){
    console.log("El resultado es: ", result);
});

