const commandText = document.querySelector(".command");
const playerBoard1 = document.querySelector(".board1");
const playerBoard2 = document.querySelector(".board2");
const startGameButton = document.querySelector(".start-game-button");
const randomizeButton = document.querySelector(".randomize-button");
const resetButton = document.querySelector(".reset-button");
const choosePlayerDialog = document.querySelector(".choose-player");
const playComputerButton = document.querySelector(".play-computer");
const playPlayerButton = document.querySelector(".play-player2");
const arrangeButton = document.querySelector(".arrange-button");
const settingsMenu = document.querySelector(".settings");
const body = document.querySelector("body");
const hideBoard = document.querySelector(".hide-container");
const messageInHideBoard = hideBoard.querySelector(".message");
const passButtonHideBoard = hideBoard.querySelector(".pass-button");
const cancelButtonHIdeBoard = hideBoard.querySelector(".cancel-button");

export {
  commandText,
  playerBoard1,
  playerBoard2,
  startGameButton,
  randomizeButton,
  resetButton,
  choosePlayerDialog,
  playComputerButton,
  playPlayerButton,
  arrangeButton,
  settingsMenu,
  body,
  hideBoard,
  messageInHideBoard,
  passButtonHideBoard,
  cancelButtonHIdeBoard
};
