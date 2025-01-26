export default function Gameboard() {
  const board = [];
  const shots = [];

  let totalHealth = 0;

  const _initBoard = () => {
    for (let i = 0; i < 10; i++) {
      board[i] = [];

      for (let j = 0; j < 10; j++) {
        board[i].push(null);
      }
    }
  };

  const placeShip = (ship, position, orientation) => {
    const { x, y } = position;

    if (!_isValidPlacement(x, y, orientation, ship.length)) {
      return;
    }

    const isVertical = orientation === "v";
    const coordinates = _calculateCoordinates(x, y, isVertical, ship.length);
    const isOverlap = _checkForOverlap(coordinates);

    if (isOverlap) {
      return;
    }

    coordinates.forEach(({ newX, newY }) => {
      board[newX][newY] = ship;
    });

    totalHealth += ship.length;

    return 1;
  };

  const receiveAttack = (x, y) => {
    if (_isOutOfBoard(x, y)) return;

    if (shots.map((shot) => `${shot.x},${shot.y}`).includes(`${x},${y}`)) {
      return;
    }

    const cell = board[x][y];
    const isHit = cell !== null;

    shots.push({ x, y, isHit });
    if (isHit) {
      cell.hit();

      return 1; // Hit
    }

    return 2; // Miss
  };

  const _checkForOverlap = (coordinates) => {
    const isOverlap = coordinates.some(({ newX, newY }) => board[newX][newY]);

    return isOverlap;
  };

  const _calculateCoordinates = (x, y, isVertical, length) => {
    const coordinates = [];

    for (let i = 0; i < length; i++) {
      const newX = isVertical ? x : x + i;
      const newY = isVertical ? y + i : y;

      coordinates.push({ newX, newY });
    }

    return coordinates;
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

  const getHits = () => {
    return shots.filter((shot) => shot.isHit);
  };

  const checkIfAllSunk = () => {
    return getHits().length >= totalHealth;
  };

  const getBoardAndShots = () => {
    return {
      board,
      shots,
    };
  };

  _initBoard();

  return {
    placeShip,
    receiveAttack,
    checkIfAllSunk,
    getBoardAndShots,
  };
}
