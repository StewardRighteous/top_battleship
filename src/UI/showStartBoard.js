import { GameManager, UIManager } from "./../manager/barrel";
import {
  startGameButton,
  randomizeButton,
  playComputerButton,
  playPlayerButton,
  arrangeButton,
  hideBoard,
  messageInHideBoard,
  passButtonHideBoard,
  cancelButtonHIdeBoard,
  gameCancelButton,
  resetButton,
} from "./UIcomponents";
import { showPlayer1Board, arrangeBoard, startGame } from "./barrel";

export default function showStartBoard() {
  gameCancelButton.style.display = "none";
  resetButton.style.display = "none";
  GameManager.setBoardRandomly();
  showPlayer1Board();

  startGameButton.addEventListener("click", () => {
    GameManager.setTurn();
    UIManager.unsubscribe(showPlayer1Board);
    UIManager.subscribe(startGame);
    UIManager.notify();
  });

  playComputerButton.addEventListener("click", () => {
    GameManager.setComputer();
    hideBoard.style.display = "flex";
    messageInHideBoard.textContent =
      "Do you want the Computer to be Brilliant ?";
    passButtonHideBoard.onclick = () => {
      GameManager.isEasyLevel(false);
      hideBoard.style.display = "none";
    };
    cancelButtonHIdeBoard.onclick = () => {
      GameManager.isEasyLevel(true);
      hideBoard.style.display = "none";
    };
  });

  playPlayerButton.addEventListener("click", () => {
    GameManager.setPlayer2();
    hideBoard.style.display = "flex";
    messageInHideBoard.textContent = "Do you want to arrange your boards ?";
    passButtonHideBoard.onclick = () => {
      hideBoard.style.display = "none";
      arrangeBoard("player1");
    };
    cancelButtonHIdeBoard.onclick = () => {
      hideBoard.style.display = "none";
    };
  });

  randomizeButton.addEventListener("click", () => {
    GameManager.gameBoard1.removeAllShips();
    GameManager.gameBoard1.placeShipsRandomly();
    UIManager.notify();
  });

  arrangeButton.addEventListener("click", () => {
    arrangeBoard("player1");
  });

  resetButton.addEventListener("click", () => {
    window.location.reload();
  });
}
