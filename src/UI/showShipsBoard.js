export default function showShipsBoard(playerBoard, UIboard) {
  for (let row = 0; row <= 9; row++) {
    for (let col = 0; col <= 9; col++) {
      const cell = document.createElement("div");
      let coord = `${row}${col}`;
      playerBoard.ships.forEach((ship) => {
        if (ship.positions.includes(coord)) {
          cell.classList.add("ship");
        }
      });
      cell.classList.add("cell");
      UIboard.appendChild(cell);
    }
  }
}
