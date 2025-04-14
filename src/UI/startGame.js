import { Game } from "./../manager/barrel";
import { generateBoard, showShipsBoard } from "./barrel";

export default function startGame() {
  // const commandText = document.querySelector(".command");
  const playerBoard1 = document.querySelector(".board1");
  const playerBoard2 = document.querySelector(".board2");
  const startGameButton = document.querySelector(".start-game-button");
  const randomizeButton = document.querySelector(".randomize-button");
  const resetButton = document.querySelector(".reset-button");
  const choosePlayerDialog = document.querySelector(".choose-player");
  const playComputerButton = document.querySelector(".play-computer");
  const playPlayerButton = document.querySelector(".play-player2");

  // Default
  let game = new Game();
  choosePlayerDialog.style.display = "flex";
  resetButton.disabled = true;
  game.player1.playerBoard.placeShipsRandomly();
  showShipsBoard(game.player1.playerBoard, playerBoard1);

  function newGame(player2 = "computer") {
    if (player2 != "computer") {
      game.opponent = player2;
    }
    game.player2.playerBoard.placeShipsRandomly();
    startGameButton.disabled = true;
    randomizeButton.disabled = true;
    resetButton.disabled = false;
    choosePlayerDialog.style.display = "none";
    generateBoard(game.player1.playerBoard.gameBoard, playerBoard1);
    generateBoard(game.player2.playerBoard.gameBoard, playerBoard2);
  }

  startGameButton.addEventListener("click", () => {
    newGame("computer");
  });

  playComputerButton.addEventListener("click", () => {
    newGame("computer");
  });

  playPlayerButton.addEventListener("click", () => {
    newGame("player2");
  });

  resetButton.addEventListener("click", () => {
    window.location.reload();
  });

  randomizeButton.addEventListener("click", () => {
    game.player1.playerBoard.removeAllShips();
    game.player1.playerBoard.placeShipsRandomly();
    showShipsBoard(game.player1.playerBoard, playerBoard1)
  });
}
