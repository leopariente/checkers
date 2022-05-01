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
  // function that moves the desired piece on the board and eats
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

  getJumps(piece, moves) {
    let result = [];
    for (let move of moves) {
      let capturedPosition = [piece.row + move[0], piece.col + move[1]];
      if (boardData.isOponenent(capturedPosition[0], capturedPosition[1], piece.type)) {
        let jump = [move[0] * 2, move[1] * 2]
        let jumpPosition = [piece.row + jump[0], piece.col + jump[1]];
        if (boardData.isEmpty(jumpPosition[0], jumpPosition[1])) {
          result.push([jumpPosition[0], jumpPosition[1], capturedPosition]);
        }
      }
    }
    return result;
  }

  removePiece(piece) {
    table.rows[piece.row].cells[piece.col].removeChild(
        table.rows[piece.row].cells[piece.col].firstElementChild
      );
      piece.row = undefined;
      piece.col = undefined;
      if (piece.type === "red") {
          this.redEaten++;
      }
      else {
          this.whiteEaten++;
      }
  }

  checkWinner() {
      if (this.redEaten === 12) {
          this.winner = "white";
      }
      if (this.whiteEaten === 12) {
          this.winner = "red";
      }
  }

  cleanCells() {
    let cellList = document.querySelectorAll("td");
    for (let cell of cellList) {
      cell.classList.remove("potential", "clicked");
    }
  }
}
