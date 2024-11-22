import Gameboard from "./gameboard";
import Ship from "./ship";

test("Place ship - valid", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 1, y: 2, orientation: "v", ship: ship };

  expect(board.placeShip(position)).toBeTruthy();
});

test("Place ship - invalid vertical", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 1, y: 9, orientation: "v", ship: ship };

  expect(board.placeShip(position)).toBeFalsy();
});

test("Place ship - invalid horizontal", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 9, y: 1, orientation: "h", ship: ship };

  expect(board.placeShip(position)).toBeFalsy();
});

test("Place ship - invalid starting pos", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 11, y: 11, orientation: "h", ship: ship };

  expect(board.placeShip(position)).toBeFalsy();
});

test("Place ship - invalid starting pos", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 5, y: 5, orientation: "h", ship: ship };

  board.placeShip(position);

  expect(board.receiveAttack(5, 5) == 1).toBeTruthy();
});

test("Place ship - space occupied", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 5, y: 5, orientation: "h", ship: ship };

  board.placeShip(position);

  expect(board.placeShip(position) == 1).toBeFalsy();
});

test("Hits sink ship", () => {
  const board = new Gameboard();
  const ship = new Ship(2);
  const position = { x: 7, y: 7, orientation: "h", ship: ship };

  board.placeShip(position);
  board.receiveAttack(7, 7);
  board.receiveAttack(8, 7);

  expect(ship.isSunk()).toBe(true);
});

test("Invalid hit", () => {
  const board = new Gameboard();

  expect(board.receiveAttack(11, 11)).toBeFalsy();
});

test("Trigger all sunk state", () => {
  const board = new Gameboard();
  const ship = new Ship(3);
  const position = { x: 6, y: 6, orientation: "v", ship: ship };

  board.placeShip(position);
  board.receiveAttack(6, 6);
  board.receiveAttack(6, 7);
  board.receiveAttack(6, 8);

  expect(board.checkIfAllSunk()).toBe(true);
});
