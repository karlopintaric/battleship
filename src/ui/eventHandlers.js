export function attackClickHandler(e, turnFunc) {
  const selectedRow = e.target.dataset.row;
  const selectedColumn = e.target.dataset.column;

  if (!selectedRow || !selectedColumn) return;

  turnFunc(parseInt(selectedRow), parseInt(selectedColumn));
}
