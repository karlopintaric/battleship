export function getRandomCoords() {
  return {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
}

export function randomlyPlaceShip({ ship, orientation }, player) {
  let shipPlaced = false;
  while (!shipPlaced) {
    const { x, y } = getRandomCoords();

    shipPlaced = player.placeShip(ship, { x, y }, orientation);
  }
}
