class Piece {
  constructor(row, col, type, name) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.name = "piece";
  }

  getPossibleMoves(boardData) {
    let moves = this.getPieceMoves(boardData);
    let filteredMoves = [];
    for (let absoluteMove of moves) {
      if (
        absoluteMove[0] >= 0 &&
        absoluteMove[0] <= 7 &&
        absoluteMove[1] >= 0 &&
        absoluteMove[1] <= 7
      ) {
        filteredMoves.push(absoluteMove);
      }
    }
    return filteredMoves;
  }

  getPieceMoves(boardData) {
    let result = [];
    let direction = -1;
    if (this.type === "red") {
      direction = 1;
    }
    let possibleMoves = [
      [direction * 1, 1],
      [direction * 1, -1],
    ];
    let jumps = boardData.getJumps(this, possibleMoves);
    if (jumps.length === 0) {
      for (let move of possibleMoves) {
        let position = [this.row + move[0], this.col + move[1]];
        if (
          boardData.isEmpty(position[0], position[1])) {
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
