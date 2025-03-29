export default class GameBoard {
  gameBoard = [];

  constructor() {
    for (let row = 0; row <= 9; row++) {
      let rowCoordinates = [];
      for (let column = 0; column <= 9; column++) {
        let coordinate = `${row}${column}`;
        rowCoordinates.push(coordinate);
      }
      this.gameBoard.push(rowCoordinates);
    }
  }

  // TODO: Place Ships
  
  // TODO: Receive attacks
  // TODO: Attacks needs to be tracked (Even for missed)
  // TODO: Whether all ships are sunk or not
}
