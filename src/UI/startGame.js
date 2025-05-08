import { GameManager } from "../manager/barrel";
import { commandText, gameCancelButton } from "./UIcomponents";
import { buildBoards } from "./barrel";

export default function () {
  if (GameManager.isGameOver()) {
    commandText.textContent = `${GameManager.fetchWinner()} Wins`;
    gameCancelButton.style.display = "none";
  } else {
    buildBoards();
  }
}
