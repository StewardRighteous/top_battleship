import Orientation from "./Orientation";

export default class Ship {
  length;
  noOfTimesHit = 0;
  orientation;
  positions = [];
  startPosition;

  constructor(length) {
    this.length = length;
    this.orientation = Orientation.horizontal;
  }

  set startPos(start) {
    this.startPosition = start;
    let row = start.at(0);
    let col = start.at(1);
    for (let i = 1; i <= this.length; i++) {
      let coordinate =
        this.orientation == Orientation.horizontal
          ? `${row}${col++}`
          : `${row++}${col}`;
      this.positions.push(coordinate);
    }
  }

  set orient(or){
    this.orientation = or;
  }

  hit() {
    this.noOfTimesHit++;
  }

  isSunk() {
    if (this.noOfTimesHit == this.length) {
      return true;
    }
    return false;
  }

  setShipAtStartPosition() {}
}
