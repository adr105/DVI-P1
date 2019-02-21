/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};


const MAX_CARDS = 16;

/**
 * Constructora de MemoryGame
 */

MemoryGame = function(gs) {
var cards = new Array(MAX_CARDS);
var couples = new Array(MAX_CARDS/2);

};

MemoryGame.prototype = {

	initGame: function() {
		
	}

	draw: function() {

	}

	loop: function() {

	}

	onClick: funtion(cardId){

	}

}

/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGameCard = function(id) {
	/*Sprite*/
	var card;
	var states;
	var state;

	this.card = id;
	this.states = new Array("down","up","found");
	this.state = this.states[0];

};

MemoryGameCard.prototype = {

	flip: function(){

	}

	found: function(){

	}

	compareTo: function(otherCard){

	}

	draw: function(gs, pos){

	}

}

