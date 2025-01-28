import Player from "../lib/player";
import Ship from "../lib/ship";
import { randomlyPlaceShip, getRandomCoords } from "../lib/cpuFunctions";
import renderBoards from "./render";
import { attackClickHandler } from "./eventHandlers";

export default function GameController(playerName) {
  const players = [Player(playerName, "human"), Player("BOT", "cpu")];

  let gameStatus = "active";
  let activePlayerIndex = 0;

  const getGameStatus = () => gameStatus;

  const getActivePlayer = () => players[activePlayerIndex];

  const getEnemyPlayer = () => players[1 - activePlayerIndex];

  const switchActivePlayer = () => 1 - activePlayerIndex;

  const updateGameStatus = (status) => {
    gameStatus = status;
  };

  const playTurn = (row, column) => {
    const activePlayer = getActivePlayer();
    const enemyPlayer = getEnemyPlayer();

    if (!enemyPlayer.receiveAttack(row, column)) return;

    renderBoards(activePlayer, enemyPlayer);

    if (enemyPlayer.checkIfAllSunk() === true) {
      updateGameStatus("win");
      return;
    }

    if (enemyPlayer.type !== "human") {
      setTimeout(() => {
        playCpuTurn(activePlayer, enemyPlayer);
      }, 1000);
    }

    switchActivePlayer();
  };

  const playCpuTurn = (humanPlayer, cpuPlayer) => {
    let validCpuAttack;
    while (!validCpuAttack) {
      const { x, y } = getRandomCoords();
      validCpuAttack = humanPlayer.receiveAttack(x, y);
    }

    renderBoards(humanPlayer, cpuPlayer);
  };

  const startGame = () => {
    const enemyBoardDiv = document.querySelector(".board-enemy");

    enemyBoardDiv.addEventListener("click", (e) =>
      attackClickHandler(e, playTurn),
    );

    const ships = [
      { ship: Ship(3), orientation: "v" },
      { ship: Ship(2), orientation: "h" },
      { ship: Ship(1), orientation: "h" },
    ];

    ships.forEach((shipObj) => {
      players.map((p) => randomlyPlaceShip(shipObj, p));
    });

    renderBoards(getActivePlayer(), getEnemyPlayer());
  };

  return {
    playTurn,
    startGame,
    getGameStatus,
  };
}
