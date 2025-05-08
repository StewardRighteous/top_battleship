import { GameManager, UIManager } from "../manager/barrel";
import { showPlayer1Board, startGame } from "./barrel";
import {
  choosePlayerDialog,
  commandText,
  playerBoard1,
  playerBoard2,
  startGameButton,
  randomizeButton,
  arrangeButton,
  resetButton,
  gameCancelButton,
} from "./UIcomponents";

export default function buildBoards() {
  function setupUI() {
    startGameButton.style.display = "none";
    randomizeButton.style.display = "none";
    arrangeButton.style.display = "none";
    resetButton.style.display = "block";
    commandText.textContent = "Player 1 Turn";
    gameCancelButton.textContent = "CANCEL";
    gameCancelButton.style.display = "block";
    while (playerBoard1.children.length > 0) {
      playerBoard1.removeChild(playerBoard1.lastChild);
    }
    choosePlayerDialog.style.display = "none";
    while (playerBoard2.children.length > 1) {
      playerBoard2.removeChild(playerBoard2.lastChild);
    }
  }

  function resetUI() {
    startGameButton.style.display = "block";
    randomizeButton.style.display = "block";
    arrangeButton.style.display = "block";
    resetButton.style.display = "block";
    gameCancelButton.style.display = "none";
  }

  function buildPlayer1Board() {
    for (let i = 0; i < GameManager.gameBoard1.gameBoard.length; i++) {
      for (let j = 0; j < GameManager.gameBoard1.gameBoard.length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const coord = `${i}${j}`;
        cell.dataset.coord = coord;
        if (GameManager.gameBoard1.gameBoard[i][j] == "hit") {
          cell.classList.add("hit");
        } else if (GameManager.gameBoard1.gameBoard[i][j] == "miss") {
          cell.classList.add("miss");
        }
        playerBoard1.appendChild(cell);
        if (GameManager.player2turn) {
          if (GameManager.player2.playerName == "player2") {
            commandText.textContent = "Player 2 Turn";
            cell.addEventListener("click", () => {
              const hitted = cell.classList.contains("hit");
              const missed = cell.classList.contains("miss");
              if (hitted || missed) {
                commandText.textContent = "Click cell that is hit or miss";
              } else {
                GameManager.hitBoard(cell.dataset.coord);
                UIManager.notify();
              }
            });
          } else {
            commandText.textContent = "Computer Moves";
            GameManager.computerMoves();
          }
        }
      }
    }
  }

  function buildPlayer2Board() {
    for (let i = 0; i < GameManager.gameBoard2.gameBoard.length; i++) {
      for (let j = 0; j < GameManager.gameBoard2.gameBoard.length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        const coord = `${i}${j}`;
        cell.dataset.coord = coord;
        if (GameManager.gameBoard2.gameBoard[i][j] == "hit") {
          cell.classList.add("hit");
        } else if (GameManager.gameBoard2.gameBoard[i][j] == "miss") {
          cell.classList.add("miss");
        }
        playerBoard2.appendChild(cell);
        if (GameManager.player1turn) {
          commandText.textContent = "Player 1 Turn";
          cell.addEventListener("click", () => {
            const hitted = cell.classList.contains("hit");
            const missed = cell.classList.contains("miss");
            if (hitted || missed) {
              commandText.textContent = "Click cell that is hit or miss";
            } else {
              GameManager.hitBoard(cell.dataset.coord);
              UIManager.notify();
            }
          });
        }
      }
    }
  }

  setupUI();
  buildPlayer1Board();
  buildPlayer2Board();

  gameCancelButton.addEventListener("click", () => {
    commandText.textContent = "GAME CANCELLED";
    resetUI();
    UIManager.unsubscribe(startGame);
    UIManager.subscribe(showPlayer1Board);
    UIManager.notify();
  });
}
