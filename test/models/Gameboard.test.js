/* eslint-disable no-undef */
import GameBoard from "../../src/models/Gameboard";

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
