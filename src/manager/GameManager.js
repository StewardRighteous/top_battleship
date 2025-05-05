import { Player } from "../models/barrel";

export default class GameManager {
  player1;
  player2;

  constructor() {
    this.player1 = new Player("player1");
    this.player2 = new Player("computer");
  }

  set opponent(name) {
    this.player2.playerName = name;
  }
}
