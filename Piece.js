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
    let possibleMoves = [];
    if (this.type === "red") {
      possibleMoves = [[1, 1], [1, -1]];
    } else {
      possibleMoves = [[-1, 1], [-1, -1]];
    }
    for (let move of possibleMoves) {
        let position = [this.row + move[0], this.col + move[1]];
        if (boardData.isEmpty(position[0], position[1])) { 
          result.push(position);
        }
      }
      return result;
  }
}
