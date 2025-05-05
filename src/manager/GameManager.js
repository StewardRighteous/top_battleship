import { Player } from "../models/barrel";

export default class GameManager {
  player1;
  player2;
  gameBoard1;
  gameBoard2;
  player1turn = false;
  player2turn = false;

  constructor(player1, player2 = "computer"){
    this.player1 = new Player(player1);
    this.player2 = new Player(player2);
    this.gameBoard1 = this.player1.playerBoard;
    this.gameBoard2 = this.player2.playerBoard;
  }

}
