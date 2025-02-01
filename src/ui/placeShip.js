import shipsListJson from "../lib/ships.json";
import Ship from "../lib/ship";

export default function ShipPlacer(
  placeShipFunc,
  renderShipFunc,
  renderBoardFunc,
) {
  let shipsList = structuredClone(shipsListJson);
  renderShipFunc(shipsList, "h");

  const shipArea = document.querySelector(".ships");
  const playerBoard = document.querySelector(".board-player");
  const enemyBoardDiv = document.querySelector(".board-enemy");

  playerBoard.style.pointerEvents = "auto";

  const playerPlaceShips = (x, y) => {
    const shipData = getShipList()[0];
    const ship = Ship(shipData.length);

    const orientation = getShipsOrientation();

    if (!placeShipFunc(x, y, ship, orientation)) {
      return;
    }

    shipsList.shift();

    renderShipFunc(shipsList, orientation);
    renderBoardFunc();

    if (shipsList.length === 0) {
      shipsList = structuredClone(shipsListJson);
      playerBoard.style.pointerEvents = "none";
      enemyBoardDiv.style.pointerEvents = "auto";
    }
  };

  const renderShips = () => {
    renderShipFunc(shipsList);
  };

  const getShipsOrientation = () => {
    return shipArea.dataset.orientation;
  };

  const getShipList = () => shipsList;

  const changeOrientation = () => {
    const orientation = getShipsOrientation() === "h" ? "v" : "h";

    renderShipFunc(getShipList(), orientation);
    renderBoardFunc();
  };

  return {
    playerPlaceShips,
    getShipList,
    changeOrientation,
    renderShips,
  };
}
