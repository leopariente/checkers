class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = "white";
    this.redEaten = 0;
    this.whiteEaten = 0;
  }

  // function that recieves a tile on board and returns the piece that is on it.
  getPiece(row, col) {
    for (const piece of this.pieces) {
      if (piece.row === row && piece.col === col) {
        return piece;
      }
    }
  }
  // checks if tile is empty
  isEmpty(row, col) {
    return this.getPiece(row, col) === undefined;
  }

  // checks if tile is oponent
  isOponenent(row, col, type) {
    if (this.getPiece(row, col) !== undefined) {
      return this.getPiece(row, col).type !== type;
    }
    return false;
  }
  // function that moves the desired piece on the board and captures if needed
  makeMove(piece, row, col) {
    let jumps = piece.getJumps();
    if (jumps.length !== 0) {
      for (let piece of jumps) {
        if (row === piece[1][0] && col === piece[1][1]) {
          this.removePiece(piece[0]);
        }
      }
    }
    table.rows[piece.row].cells[piece.col].removeChild(
      table.rows[piece.row].cells[piece.col].firstElementChild
    );
    addImage(table.rows[row].cells[col], piece.type, piece.name);
    piece.row = row;
    piece.col = col;
  }

  // function that switches turns between the white and black player
  switchMoves() {
    if (this.turn === "white") {
      this.turn = "red";
    } else {
      this.turn = "white";
    }
  }

  // function that return true if there are captures available for the current players turn
  checkJumpsAvailable() {
    for (let piece of this.pieces) {
      if (piece.type === this.turn) {
        if (piece.getJumps().length !== 0) {
          return true;
        }
      }
    }
    return false;
  }

  // function checks if the absolute position is in the 8*8 board
  isInBoard(position) {
    if (
      position[0] >= 0 &&
      position[0] <= 7 &&
      position[1] >= 0 &&
      position[1] <= 7
    ) {
      return true;
    } else {
      return false;
    }
  }

  // remove captured piece from board and uppdates the score
  removePiece(piece) {
    table.rows[piece.row].cells[piece.col].removeChild(
      table.rows[piece.row].cells[piece.col].firstElementChild
    );
    piece.row = undefined;
    piece.col = undefined;
    if (piece.type === "red") {
      this.redEaten++;
    } else {
      this.whiteEaten++;
    }
  }

  // returns winner if there is a winner
  checkWinner() {
    if (this.redEaten === 12) {
      return "White";
    }
    if (this.whiteEaten === 12) {
      return "Red";
    }
  }

  // cleans the board from css, wont show the clicked and possible moves tiles
  cleanCells() {
    let cellList = document.querySelectorAll("td");
    for (let cell of cellList) {
      cell.classList.remove("potential", "clicked");
    }
  }
}
