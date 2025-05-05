import { GameManager } from "./../manager/barrel";
import {
  startGameButton,
  randomizeButton,
  playComputerButton,
  playPlayerButton,
} from "./UIcomponents";

export default function showStartBoard() {
  GameManager.setBoardRandomly();

  startGameButton.addEventListener("click", () => {});

  playComputerButton.addEventListener("click", () => {});

  playPlayerButton.addEventListener("click", () => {});

  randomizeButton.addEventListener("click", () => {});
}
