class BoardData {
  constructor(pieces) {
    this.pieces = pieces;
    this.turn = "white";
    this.winner = undefined;
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
    makeMove(piece, row, col) {
        table.rows[piece.row].cells[piece.col].removeChild(
          table.rows[piece.row].cells[piece.col].firstElementChild
        );
        addImage(table.rows[row].cells[col], piece.type, piece.name);
        piece.row = row;
        piece.col = col;
      }

  cleanCells() {
    let cellList = document.querySelectorAll("td");
    for (let cell of cellList) {
      cell.classList.remove("potential", "clicked");
    }
  }
}
