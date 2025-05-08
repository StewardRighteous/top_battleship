import { GameManager, UIManager } from "./../manager/barrel";
import { playerBoard1, playerBoard2, choosePlayerDialog } from "./UIcomponents";

export default function showPlayer1Board() {
  while (playerBoard1.firstChild) {
    playerBoard1.removeChild(playerBoard1.firstChild);
  }

  while (playerBoard2.children.length > 1) {
    playerBoard2.removeChild(playerBoard2.lastChild);
  }
  choosePlayerDialog.style.display = "flex";

  const userBoard = GameManager.gameBoard1.gameBoard;
  const ships = GameManager.gameBoard1.ships;
  const shipCoords = [];
  ships.forEach((ship) => {
    ship.positions.forEach((coord) => {
      shipCoords.push(coord);
    });
  });

  for (let i = 0; i < userBoard.length; i++) {
    for (let j = 0; j < userBoard.length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      let coord = `${i}${j}`;
      cell.dataset.coord = coord;
      if (shipCoords.includes(coord)) {
        cell.classList.add("ship");
      }
      playerBoard1.appendChild(cell);
    }
  }
}

UIManager.subscribe(showPlayer1Board);
