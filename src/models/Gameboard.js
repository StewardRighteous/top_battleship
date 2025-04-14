import Orientation from "./Orientation";
import Ship from "./Ship";

export default class GameBoard {
  gameBoard = [];
  ships = [];
  shipSizes = [5, 4, 3, 3, 2, 1, 1, 1];

  constructor() {
    for (let row = 0; row <= 9; row++) {
      const rowCoordinates = [];
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
      const allShipCoordinates = [];
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

  generateRandomOrientation() {
    return Math.floor(Math.random() * 2) == 1
      ? Orientation.vertical
      : Orientation.horizontal;
  }

  generateRandomCoordinate(size, orient) {
    let coord;
    do {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      coord = String(row) + String(col);
    } while (!this.isInsideBoard(size, coord, orient));
    return coord;
  }

  placeShipsRandomly() {
    this.shipSizes.forEach((size) => {
      let orient = this.generateRandomOrientation();
      let noOfShipsPlaced = this.ships.length;
      do {
        let coord = this.generateRandomCoordinate(size, orient);
        this.placeShips(size, coord, orient);
        this.removeOverlapping();
      } while (this.ships.length != noOfShipsPlaced + 1);
    });
  }

  receiveAttack(coord) {
    const row = Number(coord.at(0));
    const col = Number(coord.at(1));
    this.gameBoard[row][col] = "miss";
    this.ships.forEach((ship) => {
      if (ship.positions.includes(coord)) {
        ship.hit();
        this.gameBoard[row][col] = "hit";
      }
    });
  }

  isAllSunk() {
    let allSunk = false;
    const status = [];
    this.ships.forEach((ship) => {
      const sunk = ship.isSunk();
      status.push(sunk);
    });
    if (!status.includes(false)) {
      allSunk = true;
    }
    return allSunk;
  }
}
