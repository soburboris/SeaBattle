//Здесь Представление

var view = {
	displayMessage: function (msg) {
		// var messageArea = document.querySelector('#messageArea');
		document.getElementsByTagName('h1')[0].innerHTML = msg;
		// document.getElementsByTagName('h1')[1].innerHTML = msg;
		// document.getElementsByTagName('h1')[2].innerHTML = msg;
		// document.getElementsByTagName('h1')[2].style.borderBottom = '3px solid white';
		// document.querySelector('.der').innerHTML = msg; //Альтернатива


	},
	displayHit: function (location) {
		var loc = document.getElementById(location);



		loc.setAttribute('class', 'hit');


	},

	displayMiss: function(location){

		var miss = document.getElementById(location);
		miss.setAttribute('class', 'miss');
		// miss.setAttribute('disabled', 'enable');
		// var missYou = miss.getAttribute("disabled");

	}

	

};

// Модель поведения игры!
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipSunk: 0,
	guesses: 0,
	miss: 0,


	ships: [
	{ locations: ['0', '0', '0'], hits: ['', '', '']},
	{ locations: ['0', '0', '0'], hits: ['', '', '']},
	{ locations: ['0', '0', '0'], hits: ['', '', '']}
	],


	fire: function(guess){// получаем координаты выстрела
		

		for(var i=0; i < this.numShips; i++){
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);

			if (ship.hits[index] === "hit"){
				view.displayMessage('Вы уж попадали в это место!');
				return true;


			} else 
			if ( index >= 0 ){
				view.displayHit(guess);
				view.displayMessage('Попали!!');
				this.guesses++;
				document.getElementById(ship.locations[index]).style.boxShadow = "10px 10px 70px red";


				ship.hits[index] = 'hit';
				// console.log(model.guesses);
				// console.log(ship.locations[0]);



				if (this.isSunk(ship)){
					

					
					// console.log(altText);
					// document.getElementById(ship.locations[0]).style.boxShadow = "10px 10px 70px red";
					// document.getElementById(ship.locations[1]).style.boxShadow = "10px 10px 70px red";
					// document.getElementById(ship.locations[2]).style.boxShadow = "10px 10px 70px red";


					
					view.displayMessage('Вы потопили корабль!');
					this.shipSunk++;
					if ( this.shipSunk === this.numShips){

						view.displayMessage('Вы потопили ' +this.numShips + ' корабля за: ' + this.guesses + ' выстрелов!');
						
						setTimeout(function(){
							var tor = confirm('Поздравляю с победой!!! Ура! Еще будем играть?');

							if (tor){
								window.location.reload(tor);

							}else{
								
								
								var elem = document.querySelector('#tableID');
								
								elem.classList.add('active');
								

						}

					}, 1000);

						

						

					}
					
					

				}
				return true;
				
			}
			
			


		}
		
		
		


		var sup = document.getElementById(guess);

		var altText = sup.getAttribute("disabled");
		console.log(altText);

		if (altText !== 'disabled'){

			view.displayMiss(guess);
			view.displayMessage('Вы не попали!');
			sup.setAttribute('disabled', 'disabled');
			this.guesses++;


		} else {
			
			
			view.displayMessage('Вы уж попадали в это место!');

		}

	},



	isSunk: function(ship){// Проверяем, потоплены ли все палубы

		for(var i=0; i < this.shipLength; i++){
			if(ship.hits[i] !=='hit'){
				return false;
			}
		}
		return true;
	},

	//Генерация кораблей на игровом поле

	generateShipLocations: function(){
		var locations;
		for (var i = 0; i < this.numShips; i++){
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;

		}
		console.log(this.ships);

	},
	// Метод создает корабль
	generateShip: function(){
		var direction = Math.floor(Math.random() * 2);
		var row, col;

		if (direction == 1){// horizonal
			row = Math.floor(Math.random()  * this.boardSize);
			col = Math.floor(Math.random()  * (this.boardSize - this.shipLength + 1));

		}else {//Vertical
			col = Math.floor(Math.random()  * this.boardSize);
			row = Math.floor(Math.random()  * (this.boardSize - this.shipLength + 1));

		}

		var newShipLocations = [];
		for (var i = 0; i < this.shipLength; i++){
			if ( direction == 1) {
				newShipLocations.push(row + '' + (col+i));
			} else {
				newShipLocations.push(col + '' + (row+i));

			}
		}
		console.log(direction);
		return newShipLocations;


	},

	//  метод получает один корабль и проверяет, что тот не перекрывает другие корабли var index = ship.location.indexOf(guess);


	collision: function(locations){
		for ( var i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for ( var j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >=0) {
					return true;
				}
			}
		}
		return false;


	}



	






};



var controller = {
	
	

	processGuesses: function(guess){// Подсчет количества выстрелов
		var location = parceGuess(guess);
		if (location) {
			
			console.log(model.guesses);
			var hit = model.fire(location);
			if (hit && model.shipSunk === model.numShips){
				view.displayMessage('Вы потопили ' + model.numShips + ' корабля за: ' + model.guesses + ' выстрелов!');
			}

		}

	}
}

function parceGuess(guess){// Проверяем правильность ввода координат в игре!
	var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
	if (guess === null || guess.length !==2){
		alert('Вы ввели неверные координаты!');
	}else {
		firstChar = guess.charAt(0);// извлекаем из строки первый символ
		var row = alphabet.indexOf(firstChar);
		var column =guess.charAt(1);
		// alert(row);
		// alert(column);
		if (isNaN(row) || isNaN(column)){
			alert('Вы ввели неверные координаты!!!');

		}else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
			alert('Вы ввели неверные координаты!');

		}else{
			return row + column;
		}
	}
	return null;	
}

// ввОДИМ КООРДИНАТЫ МЫШКОЙ!
var table = document.getElementById("tableID");
if (table != null) {
	for (var i = 0; i < table.rows.length; i++) {
		for (var j = 0; j < table.rows[i].cells.length; j++)
			table.rows[i].cells[j].onclick = function (guess) {
				tableText(this);
			};
		}
	}
	


	function tableText(guess) {

		model.fire(guess.id);
		console.log(guess);

		return false;




	}


	function init(){


		// Поработаем с Enter
		var guessInput = document.getElementById('guessInput');
		guessInput.onkeypress = handleKeyPress;


		fireButton.onclick = function(guess){
			var text =document.getElementsByTagName("input")[0];
			var guessfire = text.value;
			controller.processGuesses(guessfire);
			text.value = '';



		}
		model.generateShipLocations();


	}

	function handleKeyPress(e){
		var fireButton =document.getElementById('fireButton');
		if(e.keyCode === 13){
			fireButton.click();
			return false;
		}


	}




window.onload =init;









// parceGuess('DD');

	// fireButton.onclick = function(){
	// var text =document.getElementsByTagName("input")[0];
	// var guess = text.value;
	// controller.processGuesses(guess);


// controller.processGuesses('A0');
// model.fire('10');
// model.fire('20');
// model.fire('30');
// model.fire('63');
// model.fire('64');
// model.fire('65');























// function init(){


// 	fireButton.onclick = function(){


// 		var text =document.getElementsByTagName("input")[0];
// 		var num = text.value;

// 		num ="";
// 		console.log(num);


// 	}


// }	
// window.onload =init;

