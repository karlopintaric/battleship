import Gameboard from "./gameboard";
import Ship from "./ship";

test("Place ship - valid", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 1, y: 2 };

  expect(board.placeShip(ship, position, "h")).toBeTruthy();
});

test("Place ship - invalid vertical", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 9, y: 1 };

  expect(board.placeShip(ship, position, "v")).toBeFalsy();
});

test("Place ship - invalid horizontal", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 1, y: 9 };

  expect(board.placeShip(ship, position, "h")).toBeFalsy();
});

test("Place ship - invalid starting pos", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 11, y: 11 };

  expect(board.placeShip(ship, position, "h")).toBeFalsy();
});

test("Place ship - invalid starting pos", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 5, y: 5 };

  board.placeShip(ship, position, "h");

  expect(board.receiveAttack(5, 5) == 1).toBeTruthy();
});

test("Place ship - space occupied", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 5, y: 5 };

  board.placeShip(ship, position, "h");

  expect(board.placeShip(ship, position, "h") == 1).toBeFalsy();
});

test("Hits sink ship", () => {
  const board = new Gameboard();
  const ship = new Ship(2);
  const position = { x: 7, y: 7 };

  board.placeShip(ship, position, "h");
  board.receiveAttack(7, 7);
  board.receiveAttack(7, 8);

  expect(ship.isSunk()).toBe(true);
});

test("Invalid hit", () => {
  const board = new Gameboard();

  expect(board.receiveAttack(11, 11)).toBeFalsy();
});

test("Trigger all sunk state", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 6, y: 6 };

  board.placeShip(ship, position, "v");
  board.receiveAttack(6, 6);
  board.receiveAttack(7, 6);
  board.receiveAttack(8, 6);

  expect(board.checkIfAllSunk()).toBe(true);
});
