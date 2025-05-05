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
