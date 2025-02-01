function renderSingleBoard(player, boardDiv, renderShips = false) {
  const board = player.getBoard();
  const shots = player.getShots();

  boardDiv.textContent = "";
  board.forEach((row, rowId) => {
    row.forEach((cell, colId) => {
      const cellDiv = document.createElement("button");
      cellDiv.classList.add("cell");

      cellDiv.dataset.row = rowId;
      cellDiv.dataset.column = colId;

      if (cell !== null && renderShips) {
        cellDiv.classList.add("ship");
      }

      const receivedAttack = shots.find(
        (shot) => shot.x == rowId && shot.y == colId,
      );

      if (receivedAttack) {
        receivedAttack.isHit
          ? cellDiv.classList.add("hit")
          : cellDiv.classList.add("miss");
      }

      boardDiv.appendChild(cellDiv);
    });
  });
}

export function renderBoards(activePlayer, enemyPlayer) {
  const playerBoardDiv = document.querySelector(".board-player");
  const enemyBoardDiv = document.querySelector(".board-enemy");

  renderSingleBoard(activePlayer, playerBoardDiv, true);
  renderSingleBoard(enemyPlayer, enemyBoardDiv, true);
}

function renderSingleShip(ship, orientation, containerDiv) {
  const { length } = ship;

  // Clear container in case of re-render
  containerDiv.innerHTML = "";

  for (let i = 0; i < length; i++) {
    const shipPixel = document.createElement("div");
    shipPixel.classList.add("ship-pixel");

    const x = orientation === "v" ? 0 : i * 25;
    const y = orientation === "v" ? i * 25 : 0;

    shipPixel.style.left = `${x}px`;
    shipPixel.style.top = `${y}px`;

    containerDiv.appendChild(shipPixel);
  }

  // Dynamically set parent size
  const width = orientation === "h" ? length * 25 : 25;
  const height = orientation === "v" ? length * 25 : 25;

  containerDiv.style.width = `${width}px`;
  containerDiv.style.height = `${height}px`;
}

export function renderShips(ships, orientation) {
  const shipAreaDiv = document.querySelector(".ships");
  shipAreaDiv.textContent = "";

  ships.forEach((ship, shipId) => {
    const shipContainerDiv = document.createElement("div");

    shipContainerDiv.classList.add("ship-container");
    shipContainerDiv.dataset.id = shipId;
    shipAreaDiv.dataset.orientation = orientation;

    renderSingleShip(ship, orientation, shipContainerDiv);

    shipAreaDiv.appendChild(shipContainerDiv);
  });
}
