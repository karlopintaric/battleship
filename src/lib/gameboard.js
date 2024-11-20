export default function Gameboard() {
  const board = [];
  const hits = new Set();
  const misses = new Set();

  let totalHealth = 0;
  let allSunk = false;

  const initBoard = () => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];

      for (let j = 0; j < 10; j++) {
        board[i].push(null);
      }
    }
  };

  const placeShip = ({ x, y, orientation, ship }) => {
    if (!_isValidPlacement(x, y, orientation, ship.length)) {
      return;
    }

    const isVertical = orientation === "v";
    for (let i = 0; i < ship.length; i++) {
      const newX = isVertical ? x : x + i;
      const newY = isVertical ? y + i : y;

      board[newX][newY] = ship;
    }

    totalHealth += ship.length;

    return 1;
  };

  const receiveAttack = (x, y) => {
    if (_isOutOfBoard(x, y)) return;

    const cell = board[x][y];
    const isHit = cell !== null;

    if (isHit) {
      cell.hit();
      hits.add(`${x},${y}`);

      _checkIfAllSunk();
      return 1; // Hit
    }

    misses.add(`${x},${y}`);
    return 2; // Miss
  };

  const _isValidPlacement = (x, y, orientation, length) => {
    if (_isOutOfBoard(x, y)) {
      return false;
    }

    switch (orientation) {
      case "v":
        return y + length < 10;
      case "h":
        return x + length < 10;
    }
  };

  const _isOutOfBoard = (x, y) => {
    return x < 0 || x > 9 || y < 0 || y > 9;
  };

  const _checkIfAllSunk = () => {
    allSunk = hits.size >= totalHealth;
  };

  initBoard();

  return {
    initBoard,
    placeShip,
    receiveAttack,
    hits,
    misses,
    allSunk,
    totalHealth,
  };
}
