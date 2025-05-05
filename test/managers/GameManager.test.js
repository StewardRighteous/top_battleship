/* eslint-disable no-undef */
import GameManager from "../../src/manager/GameManager";
import Orientation from "../../src/models/Orientation";

test("alternate between turns from player1 to player2", () => {
  const game = new GameManager();
  const testCases = [
    [true, false],
    [false, true],
    [true, false],
  ];
  testCases.forEach((test) => {
    game.setTurn();
    expect(game.player1turn).toBe(test[0]);
    expect(game.player2turn).toBe(test[1]);
  });
});

test("setting board with random ships", () => {
  const game = new GameManager();
  game.setBoardRandomly();
  expect(game.gameBoard1.ships.length).toEqual(8);
  expect(game.gameBoard2.ships.length).toEqual(8);
});

test("setting board with user-defined coordinates and values", () => {
  const game = new GameManager();
  game.setBoardRandomly(); //initially board will be set with random ships
  game.setPlayer2();
  const ships = [
    { size: 5, coord: "50", or: Orientation.horizontal },
    { size: 4, coord: "01", or: Orientation.vertical },
    { size: 3, coord: "61", or: Orientation.horizontal },
    { size: 3, coord: "45", or: Orientation.horizontal },
    { size: 2, coord: "17", or: Orientation.horizontal },
    { size: 1, coord: "74", or: Orientation.vertical },
    { size: 1, coord: "25", or: Orientation.vertical },
    { size: 1, coord: "26", or: Orientation.vertical },
  ];
  const players = ["player1", "player2"];
  players.forEach((player) => {
    game.setBoardWithUserValue(player, ships);
  });
  expect(game.gameBoard1.ships.length).toEqual(8);
  expect(game.gameBoard2.ships.length).toEqual(8);
});

test("hit the board", () => {
  const game = new GameManager();
  game.setPlayer2();
  const ships = [
    { size: 5, coord: "50", or: Orientation.horizontal },
    { size: 4, coord: "01", or: Orientation.vertical },
    { size: 3, coord: "61", or: Orientation.horizontal },
    { size: 3, coord: "45", or: Orientation.horizontal },
    { size: 2, coord: "17", or: Orientation.horizontal },
    { size: 1, coord: "74", or: Orientation.vertical },
    { size: 1, coord: "25", or: Orientation.vertical },
    { size: 1, coord: "26", or: Orientation.vertical },
  ];
  game.setBoardWithUserValue("player1", ships);
  game.setBoardWithUserValue("player2", ships);
  game.setTurn();
  const testAttacks = ["01", "51", "00", "26", "25", "00"];
  testAttacks.forEach((coord) => {
    game.hitBoard(coord);
  });
  expect(game.gameBoard1.gameBoard[0][1]).toBe("hit");
  expect(game.gameBoard1.gameBoard[5][1]).toBe("hit");
  expect(game.gameBoard1.gameBoard[0][0]).toBe("miss"); // board changes when missed
  expect(game.gameBoard2.gameBoard[2][6]).toBe("hit");
  expect(game.gameBoard2.gameBoard[2][5]).toBe("hit");
  expect(game.gameBoard2.gameBoard[0][0]).toBe("miss");
});
