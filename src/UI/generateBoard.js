export default function generateBoard(playerBoard, UIboard) {
  while (UIboard.firstChild) {
    UIboard.removeChild(UIboard.firstChild);
  }
  for (let row = 0; row <= 9; row++) {
    for (let col = 0; col <= 9; col++) {
      const cell = document.createElement("div");
      cell.dataset.position = `${row}${col}`;
      if (playerBoard[row][col] == "hit") {
        cell.classList.add("cell", "hit");
        UIboard.appendChild(cell);
      } else if (playerBoard[row][col] == "miss") {
        cell.classList.add("cell", "miss");
        UIboard.appendChild(cell);
      } else {
        cell.classList.add("cell");
        UIboard.appendChild(cell);
      }
    }
  }
}
