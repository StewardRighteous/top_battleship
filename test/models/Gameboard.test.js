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
    expect(gameboard.gameBoard[test.i][test.j]).toBe(test.expect);
  });
});
