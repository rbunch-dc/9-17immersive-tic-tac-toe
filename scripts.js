// GLOBALS
// init whosTurn as player 1s turn
var whosTurn = 1;
var player1Squares = [];
var player2Squares = [];
var winningCombos = [
	['A1','B1','C1'], //ROW 1
	['A2','B2','C2'], //ROW 2
	['A3','B3','C3'], //ROW 3
	['A1','A2','A3'], //COLUMN 1
	['B1','B2','B3'], //COLUMN 2
	['C1','C2','C3'], //COLUMN 3
	['A1','B2','C3'], //DIAG 1
	['A3','B2','C1'] //DIAG 2
];
var gameOver = false;
var scores = [
	0,
	0
]

// Two things happen when someone clicks.
// 1. We change the DOM (for the user).
// 2. We change the vars for JS.

var markSquare = function(squareClicked){
	// console.log(squareClicked.innerHTML);
	if(squareClicked.innerHTML !== '-'){
		document.getElementById('message').innerHTML = "Sorry, that square is taken."
	}else if(whosTurn === 1){
		squareClicked.innerHTML = 'X';
		whosTurn = 2;
		player1Squares.push(squareClicked.id);
		console.log(player1Squares)
		document.getElementById('message').innerHTML = "It's O's turn"
		if(player1Squares.length >= 3){
			checkWin(player1Squares,1);
		}
	}else{
		squareClicked.innerHTML = 'O';
		whosTurn = 1;
		player2Squares.push(squareClicked.id);
		document.getElementById('message').innerHTML = "It's X's turn"
		if(player2Squares.length >= 3){
			checkWin(player2Squares,2);
		}		
	}
	// checkWin();
}

function computerMove(){
	// find a random square
	// see if that square is empty
	// if it is, send it to square
	// if it's not, keep looking
	var sqaureFound = false;
	while(!sqaureFound){
		rand = Math.floor(Math.random() * 9);
		console.log(takenSquares)
		if(takenSquares.indexOf(squares[rand].id) == -1){
			// square not taken. Take it.
			sqaureFound = true;
		}
	}
	markSquare(squares[rand]);
}

function checkWin(currentPlayerSquares,whoJustMarked){
	// if(squares[0].innerHTML === 'X') and (squares[1].innerHTML === 'X') and (squares[2].innerHTML === 'X'){
	// 	win.		
	// }
	// OUTTER LOOP - check each winning combination
	for (let i = 0; i < winningCombos.length; i++){
		// Keep track of how many of THIS winning combo the player has
		var squareCount = 0;
		// INNER LOOP - check a square inside a winning comnbination
		for(let j = 0; j < winningCombos[i].length; j++){
			var winningSquare = winningCombos[i][j]
			if(currentPlayerSquares.indexOf(winningSquare) >= 0 ){
				// THE Square belongs to the player. We do not care where.
				squareCount++;
			}
		} //end of j loop (row/diag/column complete)
		// check to see if the squareCount === 3
		if(squareCount === 3){
			// move stuff to a function
			endGame(winningCombos[i], whoJustMarked);
			break;
		}
	}
}

function endGame(winningCombo,whoJustMarked){
	// WINNER WINNER CHICKEN DINNER
	console.log(`Player ${whoJustMarked} won the game`);
	document.getElementById('message').innerHTML = `Congrats to player ${whoJustMarked}!`
	gameOver = true;
	// Loop through the winning combo, and add a class.	
	for(let i = 0; i < winningCombo.length; i++){
		var theSquare = document.getElementById(winningCombo[i])
		console.dir(theSquare);
		theSquare.className += ' winning-square';
	}
	document.getElementById('reset-button').innerHTML = '<button id="reset" class="btn btn-lg btn-success">Reset Game</button>';
	var resetButton = document.getElementById('reset');
	resetButton.addEventListener('click', reset);
}

function reset(){
	// console.log("I made a new button called rset. And the user just clicked on it.")
	// In order to reset the game...
	// 1. Clear/reset out all arrays.
	player1Squares = [];
	player2Squares = [];
	// 2. Reset the DOM to it's former glory.
	for(let i = 0; i < squares.length; i++){
		squares[i].innerHTML = '-';
		squares[i].className = 'square';
	}
	// 3. Reset the gameOver bool
	gameOver = false;
	// 4. Reset any counters.
	// 5. Winning class needs to be wiped

}

// console.log("Sanity check...")
// 1. Set up Board --- CHECK
// 2. User should be be able to click on a button. --- CHECK
// When that happens, the square should have that players mark (X or O)
// 3. If it's X turn, put an X in. If it's O's turn, put an O in.
// 4. 3 means we need to keep track of who's turn it is.
// When X goes, it becomes O's turn, when O goes it becomes X's turn.
// 5. Check to see if someone won the game. If so, congratulate them, otherwise do nothing.

// 6. Highlight the winning sqaures
// 7. Game must stop if someone won (i.e., can't keep clicking)

// var test = document.getElementsByTagName('button');
// console.log(test);

// squares is an array with 9 objects. Each object is the JS representation of the HTML tag.
var squares = document.getElementsByClassName('square');
// console.log(squares[0]);
// console.dir(squares[0]);

for (let i = 0; i < squares.length; i++){
	// console.log(squares[i]);
	// console.dir(squares[i]);
	// Now that we have each square individually (squares[i]), we will add a click listener to it
	// adding an eventlistener goes:
	// 1. What to listen to 
	// 2. addEventListener
	// 3. first arg: what event
	// 4. second arg: code to run if event happens
	squares[i].addEventListener('click', function(event){
		// console.log(this);
		// call the markSquare funciton and pass the square user clicked on.
		// Only call markSquare if gameOver === false
		// in JS, ! = not, !gameOver means not gameOver, or gameOver == false
		if(!gameOver){
			markSquare(this);
		}
	});
}


// function someoneClicked(event){
// 		// console.log(this);
// 		// call the markSquare funciton and pass the square user clicked on.
// 		// Only call markSquare if gameOver === false
// 		// in JS, ! = not, !gameOver means not gameOver, or gameOver == false
// 		if(!gameOver){
// 			markSquare(this);
// 		}
// 	}

