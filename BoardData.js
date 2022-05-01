class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = "white";
    this.winner = undefined;
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
  makeMove(piece, row, col, moves) {
    let capturedPiece;
    for (let move of moves) {
      if (move[0] === row && move[1] === col && move.length === 3) {
        capturedPiece = this.getPiece(move[2][0], move[2][1]);
        this.removePiece(capturedPiece);
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

  // function that returns a list of positions of a piece after capture and the position of the captured piece
  getJumps(piece) {
    let result = [];
    for (let move of piece.possibleMoves) {
      let capturedPosition = [piece.row + move[0], piece.col + move[1]];
      if (
        boardData.isOponenent(
          capturedPosition[0],
          capturedPosition[1],
          piece.type
        )
      ) {
        let jump = [move[0] * 2, move[1] * 2];
        let jumpPosition = [piece.row + jump[0], piece.col + jump[1]];
        if (
          boardData.isEmpty(jumpPosition[0], jumpPosition[1]) &&
          this.isInBoard(jumpPosition)
        ) {
          result.push([jumpPosition[0], jumpPosition[1], capturedPosition]);
        }
      }
    }
    return result;
  }

  // function that return true if there are captures available for the current players turn
  checkJumpsAvailable() {
    for (let piece of this.pieces) {
      if (piece.type === this.turn) {
        if (this.getJumps(piece).length !== 0) {
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
 
  // updates the winner property if there is a winner
  checkWinner() {
    if (this.redEaten === 12) {
      this.winner = "white";
    }
    if (this.whiteEaten === 12) {
      this.winner = "red";
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
