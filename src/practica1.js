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
	var cards;
	var couples;
	var board;
	var message;
	var active;

	this.cards = new Array(MAX_CARDS);
	this.couples = new Array(MAX_CARDS/2);
	this.board = gs;
	this.message = "Memory Game";
	this.active = true; //game active, not over


};

MemoryGame.prototype = {

	initGame: function() {

		/*Declaramos todas las cartas*/
		this.cards[0] = new MemoryGameCard("8-ball");
		this.cards[1] = new MemoryGameCard("8-ball");
		this.cards[2] = new MemoryGameCard("potato");
		this.cards[3] = new MemoryGameCard("potato");
		this.cards[4] = new MemoryGameCard("dinosaur");
		this.cards[5] = new MemoryGameCard("dinosaur");
		this.cards[6] = new MemoryGameCard("kronos");
		this.cards[7] = new MemoryGameCard("kronos");
		this.cards[8] = new MemoryGameCard("rocket");
		this.cards[9] = new MemoryGameCard("rocket");
		this.cards[10] = new MemoryGameCard("unicorn");
		this.cards[11] = new MemoryGameCard("unicorn");
		this.cards[12] = new MemoryGameCard("guy");
		this.cards[13] = new MemoryGameCard("guy");
		this.cards[14] = new MemoryGameCard("zeppelin");
		this.cards[15] = new MemoryGameCard("zeppelin");


		/*Las desordenamos
			fuente: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
		*/

		var currentIndex = this.cards.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = this.cards[currentIndex];
		    this.cards[currentIndex] = this.cards[randomIndex];
		    this.cards[randomIndex] = temporaryValue;
		  }
	
		this.loop();

	},

	draw: function() {
		/*Escribe el mensaje con el estado actual del juego*/
		this.board.drawMessage(this.message)

		/*Pide a cada una de las cartas del tablero que se dibujen*/
		for(var i=0; i <MAX_CARDS; i++){
			this.cards[i].draw(this.board,i); //i equals to the board pos
		}
	},

	loop: function() {

		var gameAux = this;
		var frameLoop;

		var gameDrawing = function() {
			gameAux.draw();
			if(!gameAux.active)
				clearInterval(frameLoop);
		}
		
		frameLoop = setInterval(function() {gameDrawing()},16);

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


	flop: function(){
		this.state = this.states[0];

	},

	flip: function(){
		this.state = this.states[1];
	},


	found: function(){
		this.state = this.states[2];

	},

	compareTo: function(otherCard){
		return this.card == otherCard;
	},

	draw: function(gs, pos){
		/*Si está boca abajo, dibujamos el dorso-taile*/
		if(this.state == this.states[0]){
			gs.draw("back",pos);
		}
		/*Si no, dibujamos el sprite correspondiente*/
		else{
			gs.draw(this.card,pos);
		}


	}
		

}


