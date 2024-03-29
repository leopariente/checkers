class Piece {
  constructor(row, col, type, possibleMoves, name) {
    this.row = row;
    this.col = col;
    this.type = type;
    this.possibleMoves = possibleMoves;
    this.name = name;
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
    let jumps = this.getJumps();
    if (jumps.length === 0) {
      for (let move of this.possibleMoves) {
        let position = [this.row + move[0], this.col + move[1]];
        if (boardData.isEmpty(position[0], position[1])) {
          result.push(position);
        }
      }
    }
    for (let jump of jumps) {
      result.push(jump[1]);
    }
    return result;
  }

    // function that returns a list of possible jumps with the piece they capture 
    getJumps() {
        let result = [];
        let pieceInDanger;
        for (let move of this.possibleMoves) {
          let position = [this.row + move[0], this.col + move[1]];
          if (boardData.isOponenent(position[0], position[1], this.type)) {
            pieceInDanger = boardData.getPiece(position[0], position[1]);
            let jump = [move[0] * 2, move[1] * 2];
            let jumpPosition = [this.row + jump[0], this.col + jump[1]];
            if (
              boardData.isEmpty(jumpPosition[0], jumpPosition[1]) &&
              boardData.isInBoard(jumpPosition)
            ) {
                //pushes the piece in danger and the position after capture
              result.push([pieceInDanger, jumpPosition]);
            }
          }
        }
        return result;
      }
}
