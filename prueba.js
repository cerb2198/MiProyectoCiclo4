var mimatriz = [{
    nombre:"Carlos",
    edad:23,
    fav:7,
    calcula : function(){
        var operacion = this.edad*this.fav;
        return `${operacion} es el resultado.`;
    }
},
{
    nombre:"Gina",
    edad:22,
    fav:10,
    calcula(){
        var operacion = this.edad*this.fav;
        return `${operacion} es el resultado.`;
    }
}];
/*
console.log("Nombre: ",mimatriz[0].nombre, "Edad: ",mimatriz[0].edad, "Numero favorito: ",mimatriz[0].fav,"\n", mimatriz[0].calcula());

console.log("Nombre: ",mimatriz[1].nombre, "Edad: ",mimatriz[1].edad, "Numero favorito: ",mimatriz[1].fav,"\n", mimatriz[1].calcula());
*/
function Persona(nombre,edad,sexo){
    this.nombre = nombre;
    this.edad = edad;
    this.sexo = sexo;

    this.objeto = {
        name: this.nombre,
        age: this.edad,
        sex: this.sexo
    };

    this.devuelveObjeto = function(){
        return this.objeto;
    }
};

//CREAMOS LA PRIMERA PERSONA
const persona1 = new Persona("Jaime", 54, "Masculino");
var objetosArreglo = [];
objetosArreglo.push(persona1);
console.log(objetosArreglo);

//CREAMOS LA PRIMERA PERSONA
const persona2 = new Persona("Natalia", 12, "Femenino");
objetosArreglo.push(persona2);
console.log(objetosArreglo);




