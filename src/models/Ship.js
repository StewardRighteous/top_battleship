export default class Ship {
  length;
  noOfTimesHit = 0;

  constructor(length) {
    this.length = length;
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
