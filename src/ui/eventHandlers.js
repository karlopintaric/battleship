export function attackClickHandler(e, turnFunc) {
  const selectedRow = parseInt(e.target.dataset.row);
  const selectedColumn = parseInt(e.target.dataset.column);

  if (selectedRow === null || selectedColumn === null) return;

  turnFunc(selectedRow, selectedColumn);
}
