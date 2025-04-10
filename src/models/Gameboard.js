import Orientation from "./Orientation";
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

  // TODO: Function that checks if the boat will be inside the board or not
  isInsideBoard(size, coordinate, orientation) {
    let row = Number(coordinate.at(0));
    let col = Number(coordinate.at(1));
    if (orientation == Orientation.horizontal) {
      if (col + size-1 <= 9) {
        return true;
      }
    }
    if (orientation == Orientation.vertical) {
      if (row + size-1 <= 9) {
        return true;
      }
    }
    return false;
  }

  placeShips(size, coordinate, orientation) {
    let newShip = new Ship(size);
    if (orientation) {
      newShip.orient = orientation;
    }
    if (this.isInsideBoard(newShip.length, coordinate, newShip.orientation)) {
      newShip.startPos = coordinate;
      this.ships.push(newShip);
    }
  }

  // TODO: Put all ships in random locations , it should not be out of board, it should not overlap with other
  // TODO: Receive attacks
  // TODO: Attacks needs to be tracked (Even for missed)
  // TODO: Whether all ships are sunk or not
}
