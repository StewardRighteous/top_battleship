import Orientation from "../models/Orientation";
import { GameManager, UIManager } from "./../manager/barrel";
import {
  playerBoard1,
  playerBoard2,
  choosePlayerDialog,
  commandText,
  startGameButton,
  randomizeButton,
  arrangeButton,
  resetButton,
  settingsMenu,
} from "./UIcomponents";

export default function arrangeBoard(player) {
  const setButton = document.createElement("button");
  const cancelButton = document.createElement("button");

  function setupSetting() {
    playerBoard1.classList.add("arrange-ships");
    commandText.textContent = "Place All Ships inside the board";
    startGameButton.style.display = "none";
    randomizeButton.style.display = "none";
    arrangeButton.style.display = "none";
    resetButton.style.display = "none";
    setButton.textContent = "SET";
    cancelButton.textContent = "Cancel";
    cancelButton.style.backgroundColor = "red";
    settingsMenu.append(cancelButton, setButton);
    while (playerBoard1.firstChild) {
      playerBoard1.removeChild(playerBoard1.firstChild);
    }
    choosePlayerDialog.style.display = "none";
  }

  function resetSetting() {
    playerBoard1.classList.remove("arrange-ships");
    setButton.remove();
    cancelButton.remove();
    startGameButton.style.display = "block";
    randomizeButton.style.display = "block";
    arrangeButton.style.display = "block";
    resetButton.style.display = "block";
  }

  setupSetting();

  // Taking the Player Board
  let gameBoard;
  if (player == "player1") {
    gameBoard = GameManager.gameBoard1;
  } else if (player == "player2") {
    gameBoard = GameManager.gameBoard2;
  }

  function isRotatable(size, coord, or) {
    const occupiedCells = Array.from(
      playerBoard2.querySelectorAll(".occupied"),
    );
    const occupiedCoords = [];
    occupiedCells.forEach((cell) => {
      occupiedCoords.push(cell.dataset.coord);
    });
    let row = Number(coord.at(0));
    let col = Number(coord.at(1));
    for (let i = 0; i < size - 1; i++) {
      if (or == "H") {
        let occupiedCell = `${row}${++col}`;
        if (occupiedCoords.includes(occupiedCell)) {
          return false;
        }
      } else if (or == "V") {
        let occupiedCell = `${++row}${col}`;
        if (occupiedCoords.includes(occupiedCell)) {
          return false;
        }
      }
    }
    return true;
  }

  function rotate(e, orient, shipContainer) {
    let width = shipContainer.style.width;
    shipContainer.style.width = shipContainer.style.height;
    shipContainer.style.height = width;
    e.target.dataset.or = orient;
    const shipId = `.${shipBeingDragged.dataset.shipID}`;
    const shipOccupiedCells = playerBoard2.querySelectorAll(shipId);
    for (let elem of shipOccupiedCells) {
      elem.classList.remove("occupied", shipBeingDragged.dataset.shipID);
    }
  }

  // Showing ships in left board
  const shipSizes = GameManager.gameBoard1.shipSizes;
  let shipBeingDragged;
  shipSizes.forEach((size, i) => {
    const shipContainer = document.createElement("div");
    shipContainer.classList.add("ship-container");
    shipContainer.dataset.or = Orientation.horizontal;
    shipContainer.dataset.size = size;
    shipContainer.draggable = true;
    shipContainer.dataset.shipID = `ship-${i}`;
    let width = 50 * size;
    shipContainer.style.width = `${width}px`;
    playerBoard1.append(shipContainer);
    shipContainer.addEventListener("dragstart", (e) => {
      shipBeingDragged = e.target;
      if (!playerBoard1.contains(shipContainer)) {
        const shipId = `.${shipBeingDragged.dataset.shipID}`;
        const shipOccupiedCells = playerBoard2.querySelectorAll(shipId);
        for (let elem of shipOccupiedCells) {
          elem.classList.remove("occupied", shipBeingDragged.dataset.shipID);
        }
      }
      commandText.textContent =
        "Select the starting tip of ship to move around board";
    });
    // Rotating ships when double clicked
    shipContainer.addEventListener("dblclick", (e) => {
      if (!playerBoard1.contains(shipContainer)) {
        const size = Number(shipBeingDragged.dataset.size);
        const coord = e.target.dataset.coord;
        let orient = e.target.dataset.or == "H" ? "V" : "H";
        const isInsideBoard = GameManager.gameBoard2.isInsideBoard(
          size,
          coord,
          orient,
        );
        const isRotate = isRotatable(size, coord, orient);
        if (!isRotate) {
          commandText.textContent = "Ships should not Overlap";
        }
        if (!isInsideBoard) {
          commandText.textContent = "Ships should be inside the board";
        }
        if (orient == "H" && isInsideBoard && isRotate) {
          rotate(e, orient, shipContainer);
          const allCells = playerBoard2.querySelectorAll(".cell");
          let row = Number(coord.at(0));
          let col = Number(coord.at(1));
          const shipNewCoords = [];
          for (let i = 0; i < size; i++) {
            let newCoord = `${row}${col++}`;
            shipNewCoords.push(newCoord);
          }
          allCells.forEach((cell) => {
            if (shipNewCoords.includes(cell.dataset.coord)) {
              cell.classList.add("occupied", shipContainer.dataset.shipID);
            }
          });
        } else if (orient == "V" && isInsideBoard && isRotate) {
          rotate(e, orient, shipContainer);
          const allCells = playerBoard2.querySelectorAll(".cell");
          let row = Number(coord.at(0));
          let col = Number(coord.at(1));
          const shipNewCoords = [];
          for (let i = 0; i < size; i++) {
            let newCoord = `${row++}${col}`;
            shipNewCoords.push(newCoord);
          }
          allCells.forEach((cell) => {
            if (shipNewCoords.includes(cell.dataset.coord)) {
              cell.classList.add("occupied", shipContainer.dataset.shipID);
            }
          });
        }
      }
    });
  });

  // Showing cells to drop ships in right board
  for (let i = 0; i < gameBoard.gameBoard.length; i++) {
    for (let j = 0; j < gameBoard.gameBoard.length; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      let coord = `${i}${j}`;
      cell.dataset.coord = coord;
      playerBoard2.appendChild(cell);
      cell.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      cell.addEventListener("drop", (e) => {
        const size = Number(shipBeingDragged.dataset.size);
        const coord = e.target.dataset.coord;
        const orient = shipBeingDragged.dataset.or;
        const isInsideBoard = GameManager.gameBoard2.isInsideBoard(
          size,
          coord,
          orient,
        );
        const allCells = Array.from(playerBoard2.children);
        const currentPosition = allCells.indexOf(cell);
        const isOccupied =
          playerBoard2.children[currentPosition].classList.contains("occupied");
        if (isInsideBoard && !isOccupied) {
          cell.appendChild(shipBeingDragged);
          shipBeingDragged.dataset.coord = cell.dataset.coord;
          for (let i = 0; i < size; i++) {
            allCells[currentPosition + i].classList.add(
              "occupied",
              shipBeingDragged.dataset.shipID,
            );
          }
        }
        commandText.textContent = "Double Click to Rotate";
      });
    }
  }

  cancelButton.addEventListener("click", () => {
    resetSetting();
    UIManager.notify();
  });

  setButton.addEventListener("click", () => {
    const allCells = playerBoard2.querySelectorAll(".cell");
    const ships = [];
    const shipOccupied = [];
    allCells.forEach((cell) => {
      if (cell.children.length > 0) {
        shipOccupied.push(cell.firstChild);
      }
    });
    if (shipOccupied.length != 8) {
      commandText.textContent = "Place All Ships ";
    } else {
      shipOccupied.forEach((ship) => {
        const shipDetail = {
          size: Number(ship.dataset.size),
          coord: ship.dataset.coord,
          or: ship.dataset.or,
        };
        ships.push(shipDetail);
      });
      GameManager.setBoardWithUserValue(player, ships);
      resetSetting();
      UIManager.notify();
    }
  });
}
