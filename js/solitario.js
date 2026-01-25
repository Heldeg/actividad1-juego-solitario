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
let step = 5;

// Tapetes				
let initMat = document.getElementById("initial");
let leftoverCardMat = document.getElementById("leftover");
let receptorMat1 = document.getElementById("receptor1");
let receptorMat2 = document.getElementById("receptor2");
let receptorMat3 = document.getElementById("receptor3");
let receptorMat4 = document.getElementById("receptor4");

// Mazos
let initDeck = [];
let leftoverDeck = [];
let receptorDeck1 = [];
let receptorDeck2 = [];
let receptorDeck3 = [];
let receptorDeck4 = [];

// Contadores de cartas
let initCount = document.getElementById("init_counter");
let leftoverCount = document.getElementById("leftover_counter");
let receptorCount1 = document.getElementById("receptor_counter1");
let receptorCount2 = document.getElementById("receptor_counter2");
let receptorCount3 = document.getElementById("receptor_counter3");
let receptorCount4 = document.getElementById("receptor_counter4");
let moveCount = document.getElementById("movement_counter");

// Tiempo
let timerCount = document.getElementById("timer_counter"); // span cuenta tiempo
let seconds = 0;    // cuenta de segundos
let timer = null; // manejador del temporizador


const dictDecks = {
	"initial": initDeck,
	"leftover": leftoverDeck,
	"receptor1": receptorDeck1,
	"receptor2": receptorDeck2,
	"receptor3": receptorDeck3,
	"receptor4": receptorDeck4
}

const dictCounter = {
	"initial": initCount,
	"leftover": leftoverCount,
	"receptor1": receptorCount1,
	"receptor2": receptorCount2,
	"receptor3": receptorCount3,
	"receptor4": receptorCount4
}

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
	setupInitMat(initDeck);

	// Puesta a cero de contadores de mazos
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	setupCounters();
	// Arrancar el conteo de tiempo
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	setTimer();
	makeZonesDraggable();

} // comenzarJuego




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

function setTimer() {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	if (timer) clearInterval(timer);
	let hms = function () {
		let seg = Math.trunc(seconds % 60);
		let min = Math.trunc((seconds % 3600) / 60);
		let hor = Math.trunc((seconds % 86400) / 3600);
		let tiempo = ((hor < 10) ? "0" + hor : "" + hor)
			+ ":" + ((min < 10) ? "0" + min : "" + min)
			+ ":" + ((seg < 10) ? "0" + seg : "" + seg);
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
	for (let i = deck.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
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
	createDeck();
	shuffleDeck(deck);
	putDeckInInitMat();
	makeLastCardDraggable(deck);
} // cargarTapeteInicial

function putDeckInInitMat() {
	let stepCount = 0
	initDeck.forEach(element => {
		element.style.top = `${5 + stepCount * step}px`;
		element.style.left = `${5 + stepCount * step}px`;
		initMat.appendChild(element);
		stepCount++;
	});
}
// on drag start, on drag , on dragend



function createCard(number, suit) {
	card = document.createElement("img");
	card.src = `${imgPath}/${number}-${suit}.png`;
	card.setAttribute("data-number", number);
	card.setAttribute("data-suit", suit);
	card.classList.add("card");
	return card;
}

function createDeck() {
	for (let suit of suits) {
		for (let number of numberRange) {
			initDeck.push(createCard(number, suit));
		}
	}
}
// Use to change counter value
function updateCounter(counter, deck) {
	setCounter(counter, deck.length);
}


function setupCounters() {
	updateCounter(initCount, initDeck);
	updateCounter(leftoverCount, leftoverDeck);
	updateCounter(receptorCount1, receptorDeck1);
	updateCounter(receptorCount2, receptorDeck2);
	updateCounter(receptorCount3, receptorDeck3);
	updateCounter(receptorCount4, receptorDeck4);
	setCounter(moveCount, 0);
}


/**
	  Esta función debe incrementar el número correspondiente al contenido textual
		  del elemento que actúa de contador
*/
function incMoveCounter() {
	/*** !!!!!!!!!!!!!!!!!!! CODIGO !!!!!!!!!!!!!!!!!!!! **/
	moveCount.innerHTML = parseInt(moveCount.innerHTML) + 1;
} // incContador

/**
	Similar a las anteriores, pero ajustando la cuenta al
	valor especificado
*/
function setCounter(counter, value) {
	counter.innerHTML = value;
} // setCounter

function makeLastCardDraggable(deck) {
	if (deck.length == 0) return;
	let lastCard = deck[deck.length - 1];
	lastCard.classList.add("draggable");
	lastCard.setAttribute("draggable", true);
	lastCard.addEventListener('dragstart', (ev) => {
		// 'ev' es el objeto de evento que me preguntaste antes
		ev.dataTransfer.setData("text/plain/number", ev.target.dataset["number"]);
		ev.dataTransfer.setData("text/plain/suit", ev.target.dataset["suit"]);
		ev.dataTransfer.setData("text/plain/matId", ev.target.parentElement.id);
	});
	lastCard.addEventListener('drag', (ev) => {
		ev.target.style.cursor = "move";
		console.log("dragging");

	});
}
function makeZonesDraggable() {
	let dropZones = [receptorMat1, receptorMat2, receptorMat3, receptorMat4, leftoverCardMat];
	dropZones.forEach(zone => {
		// Evento cuando la carta entra en la zona
		zone.addEventListener("dragenter", (e) => {
			e.preventDefault();
			zone.classList.add("drag-over");
		});

		// Evento cuando la carta está sobre la zona 
		zone.addEventListener("dragover", (e) => {
			e.preventDefault();
		});

		// Evento cuando se suelta la carta
		zone.addEventListener("drop", (e) => {
			e.preventDefault();
			zone.classList.remove("drag-over");
			drop(e);
		});

		// Evento cuando la carta sale de la zona
		zone.addEventListener("dragleave", (e) => {
			zone.classList.remove("drag-over");
		});
	});
}

function drop(ev) {
	ev.preventDefault();
	let number = ev.dataTransfer.getData("text/plain/number");
	let suit = ev.dataTransfer.getData("text/plain/suit");
	let matId = ev.dataTransfer.getData("text/plain/matId");

	const targetId = ev.currentTarget.id;

	const card = document.querySelector(`[data-number='${number}'][data-suit='${suit}']`);
	centerCard(card);
	ev.currentTarget.appendChild(card);

	console.log(`Carta ${number} de ${suit} colocada en zona destino. Origen: ${matId}`);

	// Aumentar un movimiento despues de soltar la carta
	incMoveCounter();
	updateArrayDecks(dictDecks[matId], dictDecks[targetId]);
	updateCounterChangedDecks(matId, targetId);

	/*  const idElemento = ev.dataTransfer.getData("text/plain");
		   const elementoArrastrado = document.getElementById(idElemento);
		   
		   // Lo movemos al nuevo contenedor
		   ev.target.appendChild(elementoArrastrado); */

	// Ejemplo de condición para verificar si la carta puede ser colocada
	/* if (canPlaceCard(numero, palo)) {
	  // Coloca la carta y actualiza los contadores
	  makeLastCardDraggable(initDeck);  // Si la carta proviene del tapete inicial
	  makeLastCardDraggable(leftoverDeck);  // Si la carta proviene del tapete sobrante
	} */
}

function updateArrayDecks(originDeck, targetDeck) {
	const card = originDeck.pop();
	targetDeck.push(card);
	makeLastCardDraggable(originDeck);
	removeSecondLastCardDragg(targetDeck);
}

function updateCounterChangedDecks(originDeckId, targetDeckId) {
	updateCounter(dictCounter[originDeckId], dictDecks[originDeckId]);
	updateCounter(dictCounter[targetDeckId], dictDecks[targetDeckId]);
}

function removeSecondLastCardDragg(deck) {
	if (deck.length > 1) {
		let lastCard = deck[deck.length - 2];
		lastCard.classList.remove("draggable");
		lastCard.setAttribute("draggable", false);
	}
}


function centerCard(card) {
	card.style.top = "50%";
	card.style.left = "50%";
	card.style.transform = "translate(-50%, -50%)";
}

// Función para finalizar el juego
function endGame() {
	// Detener el temporizador
	if (timer) clearInterval(timer);
	alert("¡Felicidades! Has completado el juego en " + timerCount.innerHTML + " con " + moveCount.innerHTML + " movimientos.");
} // finalizarJuego

startGame();
