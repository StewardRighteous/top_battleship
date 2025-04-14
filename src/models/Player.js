import GameBoard from "./Gameboard.js";

export default class Player {
  playerName;
  playerBoard;

  constructor(playerName) {
    this.playerName = playerName;
    this.playerBoard = new GameBoard();
  }
}
