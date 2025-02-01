import ShipPlacer from "./placeShip";

export default function init_handlers({
  placeShipFunc,
  renderShipFunc,
  turnFunc,
  renderBoardFunc,
}) {
  // Check if the shipPlacer has been initialized already
  const shipPlacer = ShipPlacer(placeShipFunc, renderShipFunc, renderBoardFunc);

  // Select DOM elements
  const enemyBoardDiv = document.querySelector(".board-enemy");
  const playerBoard = document.querySelector(".board-player");

  // Disable attacking until all ships are placed
  enemyBoardDiv.style.pointerEvents = "none";

  // Attack enemy
  const attackClickHandler = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedRow || !selectedColumn) return;

    turnFunc(parseInt(selectedRow), parseInt(selectedColumn));
  };

  // Place ships
  const placeShipClickHandler = (e) => {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if (!selectedRow || !selectedColumn) return;

    shipPlacer.playerPlaceShips(
      parseInt(selectedRow),
      parseInt(selectedColumn),
    );
  };

  // Rotate ships
  const rotateShipHandler = (e) => {
    if (e.key === "r") {
      shipPlacer.changeOrientation();
    }
  };

  // Clear any existing event listeners to avoid duplicates
  enemyBoardDiv.removeEventListener("click", attackClickHandler);
  playerBoard.removeEventListener("click", placeShipClickHandler);
  document.removeEventListener("keydown", rotateShipHandler);

  // Add event listeners
  enemyBoardDiv.addEventListener("click", attackClickHandler);
  playerBoard.addEventListener("click", placeShipClickHandler);
  document.addEventListener("keydown", rotateShipHandler);

  // If there’s a need to reset the board view during game reset
  renderBoardFunc(); // Calls the function passed as a prop to render the boards
}
