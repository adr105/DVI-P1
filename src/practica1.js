//Adrián Camacho Pérez
//Facultad de Informática UCM
//Desarrollo de Videojuegos Web - P1

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
	var couples; //stores the couples found 
	var board;
	var message;
	var active; //game active or over
	var count; //counter for the score - matches 
	var card_pick; 
	var signal; //acts like a semaphore to stop interactions onClick


	this.cards = new Array(MAX_CARDS);
	this.couples = new Array(MAX_CARDS/2);
	this.board = gs;
	this.message = "Memory Game";
	this.active = true; 
	this.signal = true;
	this.card_pick = null;
	this.count = 0;

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

	/*Draw the game*/

	draw: function() {
		/*Escribe el mensaje con el estado actual del juego*/
		this.board.drawMessage(this.message)

		/*Pide a cada una de las cartas del tablero que se dibujen*/
		for(var i=0; i <MAX_CARDS; i++){
			this.cards[i].draw(this.board,i); //i equals to the board pos
		}
	},

	/*Main game loop, draw it*/

	loop: function() {

		var gameAux = this;
		var frameLoop;

		var gameDrawing = function() {
			gameAux.draw();
			if(!gameAux.active)
				clearInterval(frameLoop);
		}
		
		frameLoop = setInterval(function() {gameDrawing()},16);

	},

	/*Checks if a position is on the board*/
	onRange: function(pos){
		return (pos != null && pos >= 0 && pos < MAX_CARDS);
	},


	/*Checks if a pick may be a couple or its was already found*/
	twosome: function(cardId){
		var match;
		match = false;
		for(var i = 0; i < this.count;  i++){
			if(this.cards[cardId].getGameCard() == this.couples[i]){
				match = true;
				this.message = "Pick a facedown card";
			}
		}

		return match;
	},

	/*Flops two cards*/
	reset: function(card1, card2){
		this.cards[card1].flop();
		this.cards[card2].flop();
		this.signal = true;
		this.card_pick = null;

	},

	/*If game ends, stop the play and actions, 
	  else notifies about a match and shows the % completed*/
	endGame: function(cardId){

		if(this.count == MAX_CARDS/2){
			this.message = "You Win!!";
			this.active = false;
			this.signal = false;
			}
		else {
			this.cards[cardId].found();
			this.cards[this.card_pick].found();
			this.message = "Match found!! " + (this.count*100/(MAX_CARDS/2)) +"%";						
			this.card_pick = null;
		}
	},


	onClick: function(cardId){

		/*Comprueba si se pueden hacer cambios, la posición elegida está dentro del board, 
		  la carta no está ya levantada y no es la misma carta */
		if(this.signal && this.onRange(cardId) && this.card_pick != cardId && !this.twosome(cardId)){
			this.cards[cardId].flip();

			if(this.card_pick == null){
				this.card_pick = cardId;
			}

			else{
				/*When its a match*/
				if(this.cards[cardId].compareTo(this.cards[this.card_pick].getGameCard())){
					this.couples[this.count] = this.cards[cardId].getGameCard();
					this.count++;

					/* check if game is finished or it's just a match */
					this.endGame(cardId);
				}
				/*When player fails*/
				else{
					this.signal = false; //ignore events 
					this.message = "Try again";
					var animation_flop = this;
					setTimeout(function(){animation_flop.reset(cardId,animation_flop.card_pick)}, 1100);
				}

			}


		}

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

	getGameCard: function(){
		return this.card;
	},

	getCardState: function(){
		return this.state;
	},

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
		return (this.card == otherCard);
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


