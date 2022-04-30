// function that adds an image to a cell
function addImage(cell, type, name) {
    const image = document.createElement("img");
    image.src = "static/" + type + "/" + name + ".png";
    image.draggable = false;
    cell.appendChild(image);
  }

//function that makes the 8*8 board and initializes board
function createBoard() {
  const board = document.createElement("div");
  board.classList.add("outline-board");
  document.body.appendChild(board);

  const table = document.createElement("table");
  board.appendChild(table);

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
        }
        if (i > 4) {
            addImage(table.rows[i].cells[j], "white", "piece");
        }
      }
      cell.addEventListener("click", () => onCellClick(i, j));
    }
  }
}

function onCellClick() {}

window.addEventListener("load", createBoard);
