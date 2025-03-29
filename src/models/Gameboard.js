import Ship from "./Ship";

export default class GameBoard {
  gameBoard = [];
  ships = [];
  shipSizes = [5, 4, 3, 3, 2, 1, 1, 1];

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
  placeShips(size, coordinate) {
    let newShip = new Ship(size);
    newShip.startPos = coordinate;
    this.ships.push(newShip);
  }
  // TODO: Receive attacks
  // TODO: Attacks needs to be tracked (Even for missed)
  // TODO: Whether all ships are sunk or not
}
