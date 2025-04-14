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

  isInsideBoard(size, coordinate, orientation) {
    let row = Number(coordinate.at(0));
    let col = Number(coordinate.at(1));
    if (orientation == Orientation.horizontal) {
      if (col + size - 1 <= 9) {
        return true;
      }
    }
    if (orientation == Orientation.vertical) {
      if (row + size - 1 <= 9) {
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

  isOverlapping() {
    if (this.ships.length > 1) {
      let allShipCoordinates = [];
      for (let i = 0; i < this.ships.length - 1; i++) {
        allShipCoordinates.push(...this.ships[i].positions);
      }
      let lastShipCoordinates = this.ships.at(-1).positions;
      let overlap = false;
      lastShipCoordinates.forEach((position) => {
        if (allShipCoordinates.includes(position)) {
          overlap = true;
        }
      });
      return overlap;
    }
  }

  removeOverlapping() {
    if (this.isOverlapping() == true) {
      this.ships.pop();
    }
  }

  // TODO: Put all ships in random locations , it should not be out of board, it should not overlap with other
  placeShipsRandomly() {
    this.shipSizes.forEach((size) => {
      let orient =
        Math.floor(Math.random() * 2) == 1
          ? Orientation.vertical
          : Orientation.horizontal;
      let coord;
      do {
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);
        coord = String(row) + String(col);
      } while (!this.isInsideBoard(size, coord, orient));
      this.placeShips(size, coord, orient);
    });
  }

  // TODO: Receive attacks
  // TODO: Attacks needs to be tracked (Even for missed)
  // TODO: Whether all ships are sunk or not
}
