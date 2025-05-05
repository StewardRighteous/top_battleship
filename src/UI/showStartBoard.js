import { GameManager, UIManager } from "./../manager/barrel";
import {
  startGameButton,
  randomizeButton,
  playComputerButton,
  playPlayerButton,
} from "./UIcomponents";
import {showPlayer1Board} from "./barrel"

export default function showStartBoard() {

  GameManager.setBoardRandomly();
  showPlayer1Board();

  startGameButton.addEventListener("click", () => {
    UIManager.unsubscribe(showPlayer1Board);
  });

  playComputerButton.addEventListener("click", () => {});

  playPlayerButton.addEventListener("click", () => {});

  randomizeButton.addEventListener("click", () => {
    GameManager.gameBoard1.removeAllShips();
    GameManager.gameBoard1.placeShipsRandomly();
    UIManager.notify();
  });
}


