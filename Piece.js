class Piece {
  constructor(row, col, type, name) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.name = "piece";
    this.possibleMoves = [
      [1, 1],
      [1, -1],
    ];
    if (this.type === "white") {
      this.possibleMoves = [
        [-1, 1],
        [-1, -1],
      ];
    }
  }

  getPossibleMoves(boardData) {
    let moves = this.getPieceMoves(boardData);
    let filteredMoves = [];
    for (let absoluteMove of moves) {
      if (boardData.isInBoard(absoluteMove)) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getPieceMoves(boardData) {
    let result = [];
    let jumps = boardData.getJumps(this);
    if (jumps.length === 0) {
      for (let move of this.possibleMoves) {
        let position = [this.row + move[0], this.col + move[1]];
        if (boardData.isEmpty(position[0], position[1])) {
          result.push(position);
        }
      }
    }
    for (let jump of jumps) {
      result.push(jump);
    }
    return result;
  }
}
