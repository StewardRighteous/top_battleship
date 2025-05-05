import { Player } from "../models/barrel";

export default class GameManager {
  player1;
  player2;
  gameBoard1;
  gameBoard2;
  player1turn = false;
  player2turn = false;

  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("computer");
    this.gameBoard1 = this.player1.playerBoard;
    this.gameBoard2 = this.player2.playerBoard;
  }

  setPlayer2() {
    this.player2.playerName = "player2";
  }

  setTurn() {
    if (!this.player1turn && !this.player2turn) {
      this.player1turn = true;
      this.player2turn = false;
    } else if (this.player1turn && !this.player2turn) {
      this.player1turn = false;
      this.player2turn = true;
    } else if (!this.player1turn && this.player2turn) {
      this.player1turn = true;
      this.player2turn = false;
    }
  }

  setBoardRandomly() {
    this.gameBoard1.placeShipsRandomly();
    this.gameBoard2.placeShipsRandomly();
  }

  setBoardWithUserValue(playerName, ships) {
    if (playerName == this.player1.playerName) {
      this.gameBoard1.removeAllShips();
      ships.forEach((ship) => {
        this.gameBoard1.placeShips(ship.size, ship.coord, ship.or);
      });
    }
    if (playerName == this.player2.playerName) {
      this.gameBoard2.removeAllShips();
      ships.forEach((ship) => {
        this.gameBoard2.placeShips(ship.size, ship.coord, ship.or);
      });
    }
  }

  hitBoard(coord) {
    let row = coord.at(0);
    let col = coord.at(1);
    if (this.player1turn) {
      this.gameBoard1.receiveAttack(coord);
      if (this.gameBoard1.gameBoard[row][col] == "miss") {
        this.setTurn();
      }
    } else {
      this.gameBoard2.receiveAttack(coord);
      if (this.gameBoard1.gameBoard[row][col] == "miss") {
        this.setTurn();
      }
    }
  }
}
