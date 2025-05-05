/* eslint-disable no-undef */
import GameManager from "../../src/manager/GameManager";

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
