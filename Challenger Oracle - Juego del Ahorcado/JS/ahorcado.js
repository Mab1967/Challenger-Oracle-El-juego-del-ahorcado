var jugar = document.querySelector("#iniciar-juego");
var agregarPalabra = document.querySelector("#nueva-palabra");
var palabraNueva = document.querySelector("#input-nueva-palabra");
var error = document.querySelector("#error");
var repetida = document.querySelector("#repetida");
var pantalla = document.querySelector("#ahorcado");

// LISTA DE PALABRAS
var listaPalabras = ['CALABOZO', 'CALESITA', 'JUGUETERIA', 'DISCOS', 'PASAJERO', 'ARBUSTO', 'LATITUD', 'CLAVO', 'DISCOGRAFIA', 'ALMACEN', 'HARINA', 'MANUAL', 'VERDURA', 'PARLANTE','PENSAR', 'JIRAFA', 'SILLA', 'CAMELLO', 'PUERTA', 'TELEFONO', 'VENTILADOR', 'TURISMO', 'PILETA', 'MANCHA', 'CUADERNO', 'FRASCO', 'SOFA', 'UNIVERSIDAD', 'TRABAJO', 'ZOCALO'];

document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});

var letrasErradas = []; //Array para guardar letras erradas
var letrasHalladas = []; //Array para guarda letras halladas en la palabra
var palabra = [];

/*Botón inicio --> comenzars*/
jugar.addEventListener("click",comenzar);

/*Inicia  */
function comenzar(event){
    palabraNueva.value="";
    jugar.blur(); 
    palabra = listaPalabras[Math.floor(Math.random()*listaPalabras.length)]
    /*volver a jugar*/ 
    letrasErradas = [];
    letrasHalladas = [];
    event.preventDefault();

    pantalla.scrollIntoView({block: "end", behavior: "smooth"}); //Se mueve la pantalla hasta el canvas
    dibujarAhorcado(letrasErradas.length);
    dibujarLineas(palabra);
    escribirInstrucciones("INGRESE LAS LETRAS",320,170,"indigo");
    /*Captura letra del teclado*/
    document.addEventListener("keypress",teclado);
};

/*letra del teclado presionada.*/
function teclado(event){
    var letraNoEncontrada = true; 
    var letraIngresada = event.key.toLocaleUpperCase()
    if ((letrasHalladas.length<palabra.length)&&(letrasErradas.length<9)){
        if(validacionLetraIngresada(letraIngresada)){
            for(var z=0;z<palabra.length;z++){
                if (letraIngresada == palabra[z]){
                    letraNoEncontrada = false;
                    escribirLetra(palabra[z],z,"indigo");
                    letrasHalladas.push(letraIngresada);

                };
            };
            if ((letraNoEncontrada) && (!validacionLetraError(letraIngresada))){
                letrasErradas.push(letraIngresada);
                dibujarAhorcado(letrasErradas.length);
                escribirLetraError(letraIngresada,letrasErradas.length);
            }
        }
    }
    finDelJuego();   
}

function finDelJuego(){
    if(letrasHalladas.length==palabra.length){
        escribirPalabra("¡GANASTE, VAMOS POR MÁS!",600,400,"darkviolet");
        crearBotonVolver();
        document.removeEventListener("keypress",teclado);
    }else{
        if (letrasErradas.length==9){
            escribirPalabra("¡Fin del juego, Perdiste!",600,400,"darkviolet");
            crearBotonVolver();
            document.removeEventListener("keypress",teclado);
            for(var t in palabra){
                escribirLetra(palabra[t],t,"darkyellow");
            }
        }
    }

    /*Chequea si el click en canvas se hizo sobre el botón */
    pantalla.onclick = inicio;
    function inicio(evento){
        var x = evento.pageX - pantalla.offsetLeft;
        var y = evento.pageY - pantalla.offsetTop;
        if ((x<630)&&(x>480)&&(y<770)&&(y>725)){
            document.querySelector(".titulo").scrollIntoView({block: "start", behavior: "smooth"});
        }
    }
}

var palabraSecreta = palabraNueva;

agregarPalabra.addEventListener("click",function(event){
    let palabraIngresada = palabraNueva.value.toLocaleUpperCase();

    if (!validarPalabraNueva(palabraIngresada)){
        error.classList.remove("invisible");
        palabraNueva.focus();
        setTimeout(function(){
            error.classList.add("invisible");
        },2000);
        
    }else{
        if(validarPalabraRepetida(palabraIngresada)){
            repetida.classList.remove("invisible");
            palabraNueva.focus();
            setTimeout(function(){
            repetida.classList.add("invisible");
            },2000);
        }else{
            listaPalabras.push(palabraIngresada);
                agregada.classList.remove("invisible");
            setTimeout(function(){
                agregada.classList.add("invisible");
            },2000);
            palabraNueva.value="";
        }
    }
});

var abecedario = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";

/*Ingreso de letra correcta*/
function validacionLetraIngresada(letra){
    var letraCorrecta = false;
    var letraRepetida = false
    letraCorrecta = abecedario.includes(letra);
    letraRepetida = letrasHalladas.includes(letra);
    if(letraCorrecta && !letraRepetida){
        return true;
    }else{
        return false
    }
}

 /*Letra errada no este en errores */
function validacionLetraError(letraError){
    var error = false;
    error = letrasErradas.includes(letraError)
    return error;
}

/*Valida que no tenga caracteres especiales ni numeros */
function validarPalabraNueva(palabra){

    for(i=0;i<palabra.length;i++){
        if (!letraAbecedario(palabra[i])){
            return false;
        }
    }
    return true;
}

/*Letra este en el abecedario */
function letraAbecedario(letra){
    return abecedario.includes(letra);
}

/*Palabra ingresada no este repetida */
function validarPalabraRepetida(palabra){
    return listaPalabras.includes(palabra);
}