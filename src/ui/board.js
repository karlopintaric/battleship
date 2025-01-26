export default function renderBoard(
  { board, shots },
  boardDiv,
  renderShips = true,
) {
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
