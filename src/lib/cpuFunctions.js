import Ship from "./ship";

export function getRandomCoords() {
  return {
    x: Math.floor(Math.random() * 10),
    y: Math.floor(Math.random() * 10),
  };
}

function getRandomOrientation() {
  const randomIndex = Math.floor(Math.random() * 2);
  const choices = ["h", "v"];

  return choices[randomIndex];
}

export function randomlyPlaceShips(ships, player) {
  ships.forEach((shipData) => {
    const ship = Ship(shipData.length);

    let shipPlaced;
    while (!shipPlaced) {
      shipPlaced = player.placeShip(
        ship,
        getRandomCoords(),
        getRandomOrientation(),
      );
    }
  });
}
