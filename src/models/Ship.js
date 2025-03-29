const Orientation = {
  vertical: "V",
  horizontal: "H",
};
Object.freeze(Orientation);

export default class Ship {
  length;
  noOfTimesHit = 0;
  startPosition;
  orientation;

  constructor(length) {
    this.length = length;
    this.orientation = Orientation.horizontal;
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
}
