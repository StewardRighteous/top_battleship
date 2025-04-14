/* eslint-disable no-undef */
import GameBoard from "../../src/models/Gameboard";
import Orientation from "../../src/models/Orientation";

test("gameboard is created with right coordinates", () => {
  let gameboard = new GameBoard();
  const testCases = [
    { i: 0, j: 0, expect: "00" },
    { i: 5, j: 4, expect: "54" },
    { i: 9, j: 8, expect: "98" },
  ];
  testCases.forEach((test) => {
    expect(gameboard.gameBoard[test.i][test.j]).toMatch(test.expect);
  });
});

test("generate ship with size and position coordinate", () => {
  let gameboard = new GameBoard();
  const testCases = [
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
  const testCases = [
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

test("ship should not go out of board", () => {
  let gameBoard = new GameBoard();
  const testCases = [
    { shipSize: 5, start: "99", orient: Orientation.horizontal, output: false },
    { shipSize: 4, start: "88", orient: Orientation.vertical, output: false },
    { shipSize: 4, start: "45", orient: Orientation.vertical, output: true },
    { shipSize: 5, start: "00", orient: Orientation.horizontal, output: true },
    { shipSize: 4, start: "96", orient: Orientation.horizontal, output: true },
    { shipSize: 2, start: "90", orient: Orientation.vertical, output: false },
    { shipSize: 3, start: "09", orient: Orientation.horizontal, output: false },
  ];
  testCases.forEach((test) => {
    expect(
      gameBoard.isInsideBoard(test.shipSize, test.start, test.orient),
    ).toBe(test.output);
  });
});

test("ships should not overlap and remove the last ship that overlapped", () => {
  let gameBoard = new GameBoard();
  const placeShipsOrder = [
    { size: 5, coord: "00" },
    { size: 5, coord: "01" },
    { size: 4, coord: "20", orient: Orientation.vertical },
    { size: 4, coord: "03", orient: Orientation.vertical },
  ];
  placeShipsOrder.forEach((ship) => {
    gameBoard.placeShips(ship.size, ship.coord, ship.orient);
    gameBoard.removeOverlapping();
  });
  expect(gameBoard.ships.length).toEqual(2);
});

test("ships are placed randomly with no overlap", () => {
  let gameBoard = new GameBoard();
  gameBoard.placeShipsRandomly();
  gameBoard.ships.forEach((ship) => {
    expect(ship.positions.length).toEqual(ship.length);
  });
  const allPositions = [];
  gameBoard.ships.forEach((ship) => {
    allPositions.push(...ship.positions);
  });
  const duplicates = allPositions.filter(
    (item, index) => allPositions.indexOf(item) !== index,
  );
  expect(duplicates.length).toEqual(0);
});
