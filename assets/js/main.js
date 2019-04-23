class Piece {
    constructor(name, moveset,initial,emoji) {
        this.name = name;
        this.moveset = moveset;
        this.initial = initial;
        this.emoji = emoji;
    }

    getName() {
        return "This is a " + this.name;
    }
}

let blackPawn = new Piece("black pawn",[8,16],"yes","♟");
let whitePawn = new Piece("white pawn",[-8,-16],"yes","♙");
let blackKnight = new Piece("black knight",[15,17],"yes","♞");
let whiteKnight = new Piece("white knight",[-15,-17],"yes","♘");

console.log("blackPawn",blackPawn.getName());
console.log("blackPawn",blackKnight.getName());

var originalPieceLocation;
var originalSquare;

var chessboard = document.getElementById("chessboard");
var side_container = document.getElementById("side-notation");

side_container.insertAdjacentHTML('beforeend', `<div class="side-notation">8</div>
    <div class="side-notation">7</div>
    <div class="side-notation">6</div>
    <div class="side-notation">5</div>
    <div class="side-notation">4</div>
    <div class="side-notation">3</div>
    <div class="side-notation">2</div>
    <div class="side-notation">1</div>`);

// first row
chessboard.insertAdjacentHTML('beforeend', `<div class="white">&#9820;</div>
<div class="black">&#9822;</div>
<div class="white">&#9821;</div>
<div class="black">&#9819;</div>
<div class="white">&#9818;</div>
<div class="black">&#9821;</div>
<div class="white">&#9822;</div>
<div class="black">&#9820;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black">&#9823;</div>
<div class="white">&#9823;</div>
<div class="black">&#9823;</div>
<div class="white">&#9823;</div>
<div class="black">&#9823;</div>
<div class="white">&#9823;</div>
<div class="black">&#9823;</div>
<div class="white">&#9823;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>
<div class="black"></div>
<div class="white"></div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="white">&#9817;</div>
<div class="black">&#9817;</div>
<div class="white">&#9817;</div>
<div class="black">&#9817;</div>
<div class="white">&#9817;</div>
<div class="black">&#9817;</div>
<div class="white">&#9817;</div>
<div class="black">&#9817;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="black">&#9814;</div>
<div class="white">&#9816;</div>
<div class="black">&#9815;</div>
<div class="white">&#9813;</div>
<div class="black">&#9812;</div>
<div class="white">&#9815;</div>
<div class="black">&#9816;</div>
<div class="white">&#9814;</div>`);

chessboard.insertAdjacentHTML('beforeend', `<div class="bottom-notation">a</div>
    <div class="bottom-notation">b</div>
    <div class="bottom-notation">c</div>
    <div class="bottom-notation">d</div>
    <div class="bottom-notation">e</div>
    <div class="bottom-notation">f</div>
    <div class="bottom-notation">g</div>
    <div class="bottom-notation">h</div>`);

document.addEventListener('click', function (event) {
	var boardNotation;
	var possibleMoves;

	// check if element selected contains either black or white
	if (!event.target.classList.contains('black') && !event.target.classList.contains('white')) return;

	if (event.target.classList.contains('black-moves') || event.target.classList.contains('white-moves')) {
		clear_board();
        originalSquare.innerHTML = '';
		console.log("originalPieceLocation",originalPieceLocation);
		event.target.innerHTML = originalPieceLocation;
		return;
	};

    originalPieceLocation = event.target.innerHTML;
    originalSquare = event.target;

	// clear the board of all previous highlight/select classes
	clear_board();

	event.target.classList.add("highlight");

	boardNotation = getBoardNotation(event.target);
	console.log("this square is ", boardNotation);

	if(event.target.innerHTML.length) {
		event.target.classList.add("selected");
		if (event.target.innerHTML == "♟") {
			console.log("it's a black pawn!");
			possibleMoves = getPossibleMoves(boardNotation,"black pawn");
			console.log("possible moves",possibleMoves);
			highlightPossibleMoves(possibleMoves, "black");
		}
		if (event.target.innerHTML == "♙") {
			console.log("it's a white pawn!");
			possibleMoves = getPossibleMoves(boardNotation,"white pawn");
			console.log("possible moves",possibleMoves);
			highlightPossibleMoves(possibleMoves, "white");
		}
		if (event.target.innerHTML == "♞") {
			console.log("it's a black knight!");
			possibleMoves = validateMoveset(getPossibleMoves(boardNotation,"black knight"));
			console.log("possible moves",possibleMoves);
			highlightPossibleMoves(possibleMoves, "black");
		}
		if (event.target.innerHTML == "♘") {
			console.log("it's a white knight!");
			possibleMoves = validateMoveset(getPossibleMoves(boardNotation,"white knight"));
			console.log("possible moves",possibleMoves);
			highlightPossibleMoves(possibleMoves, "white");
		}
	}

}, false);

function getBoardNotation(paramTarget) {
	var index = Array.prototype.indexOf.call(chessboard.children, paramTarget);
	var rank;
	var file;

	var rank_arr = [8,7,6,5,4,3,2,1];
	var file_arr = ["a","b","c","d","e","f","g","h"];

	rank = rank_arr[Math.floor(index/8)];
	file = file_arr[index % 8];

	console.log("algebraic notation", file+rank);

	return index;
}

function getPossibleMoves(boardIndex,boardPiece) {
	var moveset = [];
	if(boardPiece == 'black pawn') {
		moveset.push(boardIndex+8);
		moveset.push(boardIndex+16);
	}
	if(boardPiece == 'white pawn') {
		moveset.push(boardIndex-8);
		moveset.push(boardIndex-16);
	}
	if(boardPiece == 'black knight') {
		moveset.push(boardIndex+6);
		moveset.push(boardIndex+10);
		moveset.push(boardIndex+15);
		moveset.push(boardIndex+17);
        moveset.push(boardIndex-6);
        moveset.push(boardIndex-10);
		moveset.push(boardIndex-15);
		moveset.push(boardIndex-17);
	}
	if(boardPiece == 'white knight') {
        moveset.push(boardIndex+6);
		moveset.push(boardIndex+10);
		moveset.push(boardIndex+15);
		moveset.push(boardIndex+17);
        moveset.push(boardIndex-6);
        moveset.push(boardIndex-10);
		moveset.push(boardIndex-15);
		moveset.push(boardIndex-17);
	}
	return moveset;
}

/** This funtion removes calculate square moves that does not exist on a 8x8 chessboard at 0 index */
function validateMoveset(moveset) {
    let validatedMoves = moveset.filter(move => move > 0 && move <= 63 );
    console.log("validatedMoves",validatedMoves);
    return validatedMoves;
}
/** There's a check to make sure the square is not already occupied by another piece */
function highlightPossibleMoves(movelist,color) {
	movelist.map(function(value){
		if (color == "black") {
            if (document.querySelectorAll('#chessboard')[0].children[value].innerHTML.length == 0) {
                document.querySelectorAll('#chessboard')[0].children[value].classList.add("black-moves");
            }
		}
		if (color == "white") {
            if (document.querySelectorAll('#chessboard')[0].children[value].innerHTML.length == 0) {
                document.querySelectorAll('#chessboard')[0].children[value].classList.add("white-moves");
            }
		}
	});
}

function clear_board() {
	Array.from(document.querySelectorAll('#chessboard')[0].children).map(function(ele){
		ele.classList.remove("selected");
		ele.classList.remove("highlight");
		ele.classList.remove("black-moves");
		ele.classList.remove("white-moves");
	});
}