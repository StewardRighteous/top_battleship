/* eslint-disable no-undef */
import GameBoard from "../../src/models/Gameboard";
import Orientation from "../../src/models/Orientation";

test("gameboard is created with right coordinates", () => {
  let gameboard = new GameBoard();
  let testCases = [
    {
      i: 0,
      j: 0,
      expect: "00",
    },
    {
      i: 5,
      j: 4,
      expect: "54",
    },
    {
      i: 9,
      j: 8,
      expect: "98",
    },
  ];
  testCases.forEach((test) => {
    expect(gameboard.gameBoard[test.i][test.j]).toMatch(test.expect);
  });
});

test("generate ship with size and position coordinate", () => {
  let gameboard = new GameBoard();
  let testCases = [
    {
      index: 0,
      size: 5,
      coordinate: "00",
      contains: ["00", "01", "02", "03", "04"],
    },
    {
      index: 1,
      size: 3,
      coordinate: "25",
      contains: ["25", "26", "27"],
    },
    {
      index: 2,
      size: 4,
      coordinate: "96",
      contains: ["96", "97", "98", "99"],
    },
  ];
  testCases.forEach((test) => {
    gameboard.placeShips(test.size, test.coordinate);
    expect(gameboard.ships[test.index].length).toEqual(test.size);
    expect(gameboard.ships[test.index].startPosition).toMatch(test.coordinate);
    test.contains.forEach((coord) => {
      expect(gameboard.ships[test.index].positions).toContain(coord);
    });
  });
});

test("create ship with various orientation (Vertical and Horizontal)", () => {
  let gameBoard = new GameBoard();
  let testCases = [
    {
      index: 0,
      size: 5,
      coordinate: "00",
      contains: ["00", "10", "20", "30", "40"],
      orientation: Orientation.vertical,
    },
    {
      index: 1,
      size: 3,
      coordinate: "25",
      contains: ["25", "26", "27"],
      orientation: Orientation.horizontal,
    },
    {
      index: 2,
      size: 4,
      coordinate: "96",
      orientation: Orientation.horizontal,
      contains: ["96", "97", "98", "99"],
    },
  ];
  testCases.forEach((test) => {
    gameBoard.placeShips(test.size, test.coordinate, test.orientation);
    test.contains.forEach((coord) => {
      expect(gameBoard.ships[test.index].positions).toContain(coord);
    });
  });
});
