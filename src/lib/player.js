import Gameboard from "./gameboard";

export default function Player(playerName, type) {
  const board = new Gameboard();

  const playerPlaceShip = ({ x, y, orientation, ship }) => {
    board.placeShip(ship, { x, y }, orientation);
  };

  const randomPlaceShip = (ship, orientation) => {
    let shipPlaced = false;
    while (!shipPlaced) {
      const randomX = Math.floor(Math.random * 10);
      const randomY = Math.floor(Math.random * 10);

      shipPlaced =
        board.placeShip(ship, { randomX, randomY }, orientation) === 1;
    }
  };

  const placeShip = type === "cpu" ? randomPlaceShip : playerPlaceShip;

  return {
    receiveAttack: board.receiveAttack,
    placeShip,
    playerName,
  };
}
