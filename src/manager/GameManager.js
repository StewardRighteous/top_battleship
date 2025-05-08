import { Player } from "../models/barrel";

class GameManager {
  player1;
  player2;
  gameBoard1;
  gameBoard2;
  player1turn = false;
  player2turn = false;
  winner;
  levelEasy = true;
  lastHit;

  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("computer");
    this.gameBoard1 = this.player1.playerBoard;
    this.gameBoard2 = this.player2.playerBoard;
  }

  setPlayer2() {
    this.player2.playerName = "player2";
  }

  setComputer() {
    this.player2.playerName = "computer";
  }

  isEasyLevel(level) {
    this.levelEasy = level;
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
      this.gameBoard2.receiveAttack(coord);
      if (this.gameBoard2.gameBoard[row][col] == "miss") {
        this.setTurn();
      }
    } else {
      this.gameBoard1.receiveAttack(coord);
      if (this.gameBoard1.gameBoard[row][col] == "miss") {
        this.setTurn();
      }
    }
  }

  isGameOver() {
    if (this.player1turn) {
      let sunk = this.gameBoard2.isAllSunk();
      if (sunk) {
        this.winner = this.player1.playerName;
        this.player1turn = false;
        this.player2turn = false;
      }
      return sunk;
    }
    if (this.player2turn) {
      let sunk = this.gameBoard1.isAllSunk();
      if (sunk) {
        this.winner = this.player2.playerName;
        this.player1turn = false;
        this.player2turn = false;
      }
      return sunk;
    }
  }

  fetchWinner() {
    return this.winner;
  }

  newGame() {
    this.player1 = new Player(this.player1.playerName);
    this.player2 = new Player(this.player2.playerName);
    this.gameBoard1 = this.player1.playerBoard;
    this.gameBoard2 = this.player2.playerBoard;
    this.player1turn = false;
    this.player2turn = false;
    this.winner = undefined;
  }

  computerMoves() {
    const options = [];
    for (let i = 0; i < this.gameBoard1.gameBoard.length; i++) {
      for (let j = 0; j < this.gameBoard1.gameBoard.length; j++) {
        if (this.gameBoard1.gameBoard[i][j].length <= 2) {
          options.push(this.gameBoard1.gameBoard[i][j]);
        }
      }
    }
    if (this.levelEasy) {
      let rand = Math.floor(Math.random() * options.length);
      this.hitBoard(options[rand]);
    } else {
      if (this.lastHit != undefined) {
        let newHit1 = `${this.lastHit.at(0)}${Number(this.lastHit.at(1)) + 1}`;
        let newHit2 = `${Number(this.lastHit.at(0)) + 1}${Number(this.lastHit.at(1))}`;
        if (options.includes(newHit1)) {
          this.hitBoard(newHit1);
        } else if (options.includes(newHit2)) {
          this.hitBoard(newHit2);
        }
        this.lastHit = undefined;
      } else {
        let rand = Math.floor(Math.random() * options.length);
        this.hitBoard(options[rand]);
        const coord = options[rand];
        this.lastHit = coord;
      }
    }
  }
}

export default new GameManager();
