import Gameboard from "./gameboard";

export default function Player(name, type) {
  const board = Gameboard();

  return {
    name,
    type,
    receiveAttack: board.receiveAttack,
    placeShip: board.placeShip,
    getBoard: board.getBoard,
    getShots: board.getShots,
    checkIfAllSunk: board.checkIfAllSunk,
  };
}
