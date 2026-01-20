/***** INICIO DECLARACIÓN DE VARIABLES GLOBALES *****/

const imgPath = '../imagenes/baraja'
// Array de palos
let suits = ["viu", "cua", "hex", "cir"];
// Array de número de cartas
//let numberRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// En las pruebas iniciales solo se trabajará con cuatro cartas por palo:

//TODO: allow the user to decide the range in the UI
let numberRange = [9, 10, 11, 12];


// paso (top y left) en pixeles de una carta a la siguiente en un mazo
let paso = 5;

// Tapetes				
let initMat   = document.getElementById("initial");
let leftoverCardMat = document.getElementById("leftover");
let receptorMat1 = document.getElementById("receptor1");
let receptorMat2 = document.getElementById("receptor2");
let receptorMat3 = document.getElementById("receptor3");
let receptorMat4 = document.getElementById("receptor4");

// Mazos
let initDeck   = [];
let leftoverDeck = [];
let receptorDeck1 = [];
let receptorDeck2 = [];
let receptorDeck3 = [];
let receptorDeck4 = [];

// Contadores de cartas
let initCount     = document.getElementById("init_counter");
let leftoverCount   = document.getElementById("leftover_counter");
let receptorCount1   = document.getElementById("receptor_counter1");
let receptorCount2   = document.getElementById("receptor_counter2");
let receptorCount3   = document.getElementById("receptor_counter3");
let receptorCount4   = document.getElementById("receptor_counter4");
let moveCount = document.getElementById("movement_counter");

// Tiempo
let timerCount  = document.getElementById("timer_counter"); // span cuenta tiempo
let seconds 	 = 0;    // cuenta de segundos
let timer = null; // manejador del temporizador

/***** FIN DECLARACIÓN DE VARIABLES GLOBALES *****/

 
// Rutina asociada a boton reset
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/


// El juego arranca ya al cargar la página: no se espera a reiniciar
/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

// Desarrollo del comienzo de juego
function startGame() {
	/* Crear baraja, es decir crear el mazoInicial. Este será un array cuyos 
	elementos serán elementos HTML <img>, siendo cada uno de ellos una carta.
	Sugerencia: en dos bucles for, bárranse los "palos" y los "numeros", formando
	oportunamente el nombre del fichero png que contiene a la carta (recuérdese poner
	el path correcto en la URL asociada al atributo src de <img>). Una vez creado
	el elemento img, inclúyase como elemento del array mazoInicial. 
	*/

	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/	
    
	
	// Barajar y dejar mazoInicial en tapete inicial
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

	// Puesta a cero de contadores de mazos
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	
	// Arrancar el conteo de tiempo
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/

} // comenzarJuego
function createCard(number, suit) {
	card = document.createElement("img");
	card.src = `${imgPath}/${number}-${suit}.png`;
	card.setAttribute("data-number", number);
	card.setAttribute("data-suit", suit);
	return card;
}

function createDeck() {
	for (let suit of suits) {
		for (let number of numberRange) {
			initDeck.push(createCard(number, suit));
		}
	}
}



/**
	Se debe encargar de arrancar el temporizador: cada 1000 ms se
	debe ejecutar una función que a partir de la cuenta autoincrementada
	de los segundos (segundos totales) visualice el tiempo oportunamente con el 
	format hh:mm:ss en el contador adecuado.

	Para descomponer los segundos en horas, minutos y segundos pueden emplearse
	las siguientes igualdades:

	segundos = truncar (   segundos_totales % (60)                 )
	minutos  = truncar ( ( segundos_totales % (60*60) )     / 60   )
	horas    = truncar ( ( segundos_totales % (60*60*24)) ) / 3600 )

	donde % denota la operación módulo (resto de la división entre los operadores)

	Así, por ejemplo, si la cuenta de segundos totales es de 134 s, entonces será:
	   00:02:14

	Como existe la posibilidad de "resetear" el juego en cualquier momento, hay que 
	evitar que exista más de un temporizador simultáneo, por lo que debería guardarse
	el resultado de la llamada a setInterval en alguna variable para llamar oportunamente
	a clearInterval en su caso.   
*/

function setTimer(){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	if (timer) clearInterval(timer);
    let hms = function (){
			let seg = Math.trunc( seconds % 60 );
			let min = Math.trunc( (seconds % 3600) / 60 );
			let hor = Math.trunc( (seconds % 86400) / 3600 );
			let tiempo = ( (hor<10)? "0"+hor : ""+hor ) 
						+ ":" + ( (min<10)? "0"+min : ""+min )  
						+ ":" + ( (seg<10)? "0"+seg : ""+seg );
			setCounter(timerCount, tiempo);
            seconds++;
		}
	seconds = 0;
    hms(); // Primera visualización 00:00:00
	timer = setInterval(hms, 1000);
    	
} // arrancarTiempo


/**
	Si mazo es un array de elementos <img>, en esta rutina debe ser
	reordenado aleatoriamente. Al ser un array un objeto, se pasa
	por referencia, de modo que si se altera el orden de dicho array
	dentro de la rutina, esto aparecerá reflejado fuera de la misma.
	https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_random2
*/
function shuffleDeck(deck) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/	
	for (let i =  deck.length-1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i+1));
		let k = deck[i];
		deck[i] = deck[j];
		deck[j] = k;
	}
} // barajar



/**
 	En el elemento HTML que representa el tapete inicial (variable tapeteInicial)
	se deben añadir como hijos todos los elementos <img> del array mazo.
	Antes de añadirlos, se deberían fijar propiedades como la anchura, la posición,
	coordenadas top y left, algun atributo de tipo data-...
	Al final se debe ajustar el contador de cartas a la cantidad oportuna
*/
function setupInitMat(deck) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/	
} // cargarTapeteInicial


/**
 	Esta función debe incrementar el número correspondiente al contenido textual
   	del elemento que actúa de contador
*/
function startCounter(counter){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/	
} // incContador

/**
	Idem que anterior, pero decrementando 
*/
function decCounter(counter){
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! ***/	
} // decCounter

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function setCounter(counter, value) {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
} // setContador