import Player from "../lib/player";
import { getRandomCoords, randomlyPlaceShips } from "../lib/cpuFunctions";
import { renderShips, renderBoards } from "./render";
import init_handlers from "./eventHandlers";
import { ResultModal } from "./resultModal";
import shipsList from "../lib/ships.json";

export default function GameController(playerName) {
  let players;
  let render;

  let gameStatus = "active";
  let activePlayerIndex = 0;

  const resultModal = ResultModal(() => startGame());

  const _init_players = () => {
    return [Player(playerName, "human"), Player("BOT", "cpu")];
  };

  const _init_renderer = () => {
    return () => renderBoards(getActivePlayer(), getEnemyPlayer());
  };

  const getGameStatus = () => gameStatus;

  const getActivePlayer = () => players[activePlayerIndex];

  const getEnemyPlayer = () => players[1 - activePlayerIndex];

  const switchActivePlayer = () => 1 - activePlayerIndex;

  const displayResults = (result) => {
    resultModal.showResult(result, getActivePlayer());
  };

  const placeShip = (row, column, ship, orientation) => {
    const activePlayer = getActivePlayer();

    return activePlayer.placeShip(ship, { x: row, y: column }, orientation);
  };

  const playTurn = (row, column) => {
    const activePlayer = getActivePlayer();
    const enemyPlayer = getEnemyPlayer();

    if (!enemyPlayer.receiveAttack(row, column)) return;

    render();

    if (enemyPlayer.checkIfAllSunk() === true) {
      displayResults("win");
      return;
    }

    if (enemyPlayer.type !== "human") {
      playCpuTurn(activePlayer, enemyPlayer);
    } else {
      switchActivePlayer();
      return;
    }

    if (activePlayer.checkIfAllSunk() === true) {
      displayResults("lose");
    }
  };

  const playCpuTurn = (humanPlayer) => {
    let validCpuAttack;
    while (!validCpuAttack) {
      const { x, y } = getRandomCoords();
      validCpuAttack = humanPlayer.receiveAttack(x, y);
    }

    render();
  };

  const startGame = () => {
    players = _init_players();
    render = _init_renderer();

    init_handlers({
      placeShipFunc: placeShip,
      renderShipFunc: renderShips,
      turnFunc: playTurn,
      renderBoardFunc: render,
    });

    render();

    randomlyPlaceShips(shipsList, getEnemyPlayer());
  };

  return {
    startGame,
    getGameStatus,
  };
}
