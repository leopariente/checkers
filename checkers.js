let boardData;
let playingPiece;
let moves;

const board = document.createElement("div");
board.classList.add("outline-board");
const table = document.createElement("table");

function showWinnerDialogue() {
    let winner = boardData.winner.charAt(0).toUpperCase() + boardData.winner.slice(1);
    const winnerDialogue = document.createElement("div");
    winnerDialogue.classList.add("winner");
    winnerDialogue.textContent = winner + " Wins!";
    board.appendChild(winnerDialogue);
}

// function that adds an image to a cell
function addImage(cell, type, name) {
  const image = document.createElement("img");
  image.src = "static/" + type + "/" + name + ".png";
  image.draggable = false;
  cell.appendChild(image);
}

function onCellClick(row, col) {
  if (table.rows[row].cells[col].classList.contains("potential")) {
    boardData.makeMove(playingPiece, row, col, moves);
    boardData.switchMoves();
  }
  boardData.cleanCells();
  boardData.checkWinner();
  if (boardData.winner === undefined) {
    playingPiece = boardData.getPiece(row, col);
    if (playingPiece !== undefined && playingPiece.type === boardData.turn) {
      moves = playingPiece.getPossibleMoves(boardData);
      table.rows[playingPiece.row].cells[playingPiece.col].classList.add(
        "clicked"
      );
      for (let move of moves) {
        table.rows[move[0]].cells[move[1]].classList.add("potential");
      }
    }
  }
  else {
    showWinnerDialogue();
  }
}

//function that makes the 8*8 board and initializes board
function createBoard() {
  document.body.appendChild(board);
  board.appendChild(table);

  let result = [];

  for (let i = 0; i < 8; i++) {
    let row = table.insertRow(i);
    for (let j = 0; j < 8; j++) {
      let cell = row.insertCell(j);
      if ((i + j) % 2 == 0) {
        cell.classList.add("light");
      } else {
        cell.classList.add("dark");
        if (i < 3) {
          addImage(table.rows[i].cells[j], "red", "piece");
          result.push(new Piece(i, j, "red", "piece"));
        }
        if (i > 4) {
          addImage(table.rows[i].cells[j], "white", "piece");
          result.push(new Piece(i, j, "white", "piece"));
        }
      }
      cell.addEventListener("click", () => onCellClick(i, j));
    }
  }
  boardData = new BoardData(result);
}

window.addEventListener("load", createBoard);
