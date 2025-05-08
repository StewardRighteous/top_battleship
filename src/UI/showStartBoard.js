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
} from "./UIcomponents";
import { showPlayer1Board, arrangeBoard } from "./barrel";

export default function showStartBoard() {
  GameManager.setBoardRandomly();
  showPlayer1Board();

  startGameButton.addEventListener("click", () => {
    UIManager.unsubscribe(showPlayer1Board);
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
}
