class Piece{
    constructor(name, moveset,position,emoji) {
        this.name = name;
        this.moveset = moveset;
        this.position = position;
        this.emoji = emoji;
        globalPieceArray.push(this); // a global array to keep track of all piece class that have been instantiated
    }

    getName() {
        return this.name;
    }
    getMoveSet() {
        return this.moveset;
    }
    getEmoji() {
        return this.emoji;
    }
    getPossibleMoves(boardIndex,boardPiece) {
        var possible_moveset = [];
        this.getMoveSet().map(function(move) {
            possible_moveset.push(boardIndex+move);
        });

        return possible_moveset;
    }
}

var originalPieceLocation;
var originalSquare;
var boardNotation;
var possibleMoves;
var globalPieceArray = [];

let blackPawn = new Piece("black pawn",[8,16],"yes","♟");
let whitePawn = new Piece("white pawn",[-8,-16],"yes","♙");
let knight = new Piece("knight",[6,10,15,17,-6,-10,-15,-17],"yes",["♞","♘"]);
let bishop = new Piece("bishop",{ downLeft: [7,14,21,28,35,42,49,56],
    downRight: [9,18,27,36,45,56,63,78],
    upLeft: [-7,-14,-21,-28,-35,-42,-49,-56],
    upRight: [-9,-18,-27,-36,-45,-56,-78]},"yes",["♝","♗"]);

var chessboard = document.getElementById("chessboard");
var side_container = document.getElementById("side-notation");

function build_notation() {
    for(var i = 8;i>=1;i--) {
        side_container.insertAdjacentHTML('beforeend', `<div class="side-notation">${i}</div>`);
    }
}
build_notation();

function build_black_positions() {
    // first row
    var starting_black_pieces = ["&#9820;","&#9822;","&#9821;","&#9819;","&#9818;","&#9821;","&#9822;","&#9820;"];
    starting_black_pieces.map(function(piece,idx){
        if(idx % 2) { // alternate between black and white pieces
            chessboard.insertAdjacentHTML('beforeend', `<div class="black">${piece}</div>`);
        } else {
            chessboard.insertAdjacentHTML('beforeend', `<div class="white">${piece}</div>`);
        }
    });

    // second row
    for(var i = 8;i>=1;i--) {
        if(i % 2) {
            chessboard.insertAdjacentHTML('beforeend', `<div class="white">&#9823;</div>`);
        } else {
            chessboard.insertAdjacentHTML('beforeend', `<div class="black">&#9823;</div>`);
        }
    }
}

build_black_positions();

function build_neutral_squares() {
    for(var i = 0;i<4;i++) {
        if(i % 2) {
            for(var j = 0;j<8;j++) {
                if(j % 2) {
                    chessboard.insertAdjacentHTML('beforeend', `<div class="white"></div>`);
                } else {
                    chessboard.insertAdjacentHTML('beforeend', `<div class="black"></div>`);
                }
            }
        } else {
            for(var j = 0;j<8;j++) {
                if(j % 2) {
                    chessboard.insertAdjacentHTML('beforeend', `<div class="black"></div>`);
                } else {
                    chessboard.insertAdjacentHTML('beforeend', `<div class="white"></div>`);
                }
            }
        }
    }
}

build_neutral_squares();

function build_white_positions() {
    // second row
    for(var i = 8;i>=1;i--) {
        if(i % 2) {
            chessboard.insertAdjacentHTML('beforeend', `<div class="black">&#9817;</div>`);
        } else {
            chessboard.insertAdjacentHTML('beforeend', `<div class="white">&#9817;</div>`);
        }
    }
    // first row
    var starting_black_pieces = ["&#9814;","&#9816;","&#9815;","&#9813;","&#9812;","&#9815;","&#9816;","&#9814;"];
    starting_black_pieces.map(function(piece,idx){
        if(idx % 2) { // alternate between black and white pieces
            chessboard.insertAdjacentHTML('beforeend', `<div class="white">${piece}</div>`);
        } else {
            chessboard.insertAdjacentHTML('beforeend', `<div class="black">${piece}</div>`);
        }
    });
}

build_white_positions();

function build_notation_bottom() {
    var notation_array = ["a","b","c","d","e","f","g","h"];
    notation_array.map(function(notation){
        chessboard.insertAdjacentHTML('beforeend', `<div class="bottom-notation">${notation}</div>`);
    });
}
build_notation_bottom();

document.addEventListener('click', function (event) {

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
        globalPieceArray.map(function(piece){
            if (event.target.innerHTML == piece.getEmoji() || piece.getEmoji().includes(event.target.innerHTML)) {
                console.log("it's a " + piece.getName(),piece);
                possibleMoves = validateMoveset(piece.getPossibleMoves(boardNotation,piece.getName()),piece.getName());
                console.log("possible moves",possibleMoves);
                highlightPossibleMoves(possibleMoves, "black");
            };
        });
		// if (event.target.innerHTML == "♙") {
		// 	console.log("it's a white pawn!");
		// 	possibleMoves = getPossibleMoves(boardNotation,"white pawn");
		// 	console.log("possible moves",possibleMoves);
		// 	highlightPossibleMoves(possibleMoves, "white");
		// }
		// if (event.target.innerHTML == "♞") {
		// 	console.log("it's a black knight!");
		// 	possibleMoves = validateMoveset(getPossibleMoves(boardNotation,"knight"),"knight");
		// 	console.log("possible moves",possibleMoves);
		// 	highlightPossibleMoves(possibleMoves, "black");
		// }
		// if (event.target.innerHTML == "♘") {
		// 	console.log("it's a white knight!");
		// 	possibleMoves = validateMoveset(getPossibleMoves(boardNotation,"knight"),"knight");
		// 	console.log("possible moves",possibleMoves);
		// 	highlightPossibleMoves(possibleMoves, "white");
		// }
        // if (event.target.innerHTML == "♝") {
		// 	console.log("it's a black bishop!");
		// 	possibleMoves = validateMoveset(getPossibleMoves(boardNotation,"bishop"),"black bishop");
		// 	console.log("possible moves",possibleMoves);
		// 	highlightPossibleMoves(possibleMoves, "black bishop");
		// }
        // if (event.target.innerHTML == "♗") {
		// 	console.log("it's a white bishop!");
		// 	possibleMoves = validateMoveset(getPossibleMoves(boardNotation,"bishop"),"white bishop");
		// 	console.log("possible moves",possibleMoves);
		// 	highlightPossibleMoves(possibleMoves, "white bishop");
		// }
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
        blackPawn.getMoveSet().map(function(move) {
            moveset.push(boardIndex+move);
        });
	}
	if(boardPiece == 'white pawn') {
        whitePawn.getMoveSet().map(function(move) {
            moveset.push(boardIndex+move);
        });
	}
	if(boardPiece == 'knight') {
        knight.getMoveSet().map(function(move) {
            moveset.push(boardIndex+move);
        });
	}
    // restrict diagonals to end at the edge of the chess board
	if(boardPiece == 'bishop') {
        bishop.getMoveSet().downLeft.map(function(move) {
            if (((boardIndex+move) % 8) <= (boardIndex % 8)) {
                moveset.push(boardIndex+move);
            }
        });
        bishop.getMoveSet().downRight.map(function(move) {
            if (((boardIndex+move) % 8) >= (boardIndex % 8)) {
                moveset.push(boardIndex+move);
            }
        });
        bishop.getMoveSet().upLeft.map(function(move) {
            if (((boardIndex+move) % 8) >= (boardIndex % 8)) {
                moveset.push(boardIndex+move);
            }
        });
        bishop.getMoveSet().upRight.map(function(move) {
            if (((boardIndex+move) % 8) <= (boardIndex % 8)) {
                moveset.push(boardIndex+move);
            }
        });
	}
	return moveset;
}

/**
    This function removes calculate square moves that does not exist on a 8x8 chessboard at 0 index.
    Also remove moves that span across the edge of the game board
 */
function validateMoveset(moveset,piece) {
    if(piece == 'knight') {
        var validatedMoves = moveset.filter(
            move => {
            let file_difference = (boardNotation % 8)-(move % 8);
            return move > 0 && move <= 63 && Math.abs(file_difference) <= 2;
        });
    }
    if(piece == 'white bishop') {
        var validatedMoves = moveset.filter(
            move => {
            return move > 0 && move <= 63;
        });
    }
    if(piece == 'black bishop') {
        var validatedMoves = moveset.filter(
            move => {
            return move > 0 && move <= 63;
        });
    }
    if(piece.includes('pawn')) {
        validatedMoves = moveset;
    }
    return validatedMoves;
}

/** There's a check to make sure the square is not already occupied by another piece */
function highlightPossibleMoves(movelist,color) {
    var blocked = false;
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
		if (color == "white bishop") {
            if (document.querySelectorAll('#chessboard')[0].children[value].innerHTML.length == 0 && !blocked) {
                document.querySelectorAll('#chessboard')[0].children[value].classList.add("white-moves");
            }
		}
		if (color == "black bishop") {
            if (document.querySelectorAll('#chessboard')[0].children[value].innerHTML.length == 0 && !blocked) {
                document.querySelectorAll('#chessboard')[0].children[value].classList.add("black-moves");
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