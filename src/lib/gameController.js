import Player from "./player";

export default function GameController() {
  const humanPlayer = Player();
  const cpuPlayer = Player();

  let gameStatus = "active";

  const getGameStatus = () => gameStatus;

  const playRound = (row, column) => {
    _playHumanTurn(row, column);
    _playCpuTurn();
  };

  const _playHumanTurn = (row, column) => {
    if (!cpuPlayer.receiveAttack(row, column)) return;

    if (cpuPlayer.checkIfAllSunk()) {
      gameStatus = "win";
      print("Player is the winner");
      return;
    }
  };
  const _playCpuTurn = () => {
    let validCpuAttack;

    while (!validCpuAttack) {
      let { randomX, randomY } = randomlyHit();
      validCpuAttack = humanPlayer.receiveAttack(randomX, randomY);
    }

    if (humanPlayer.checkIfAllSunk()) {
      gameStatus = "lose";
      print("CPU is the winner");
      return;
    }
  };

  const randomlyHit = () => {
    return {
      randomX: Math.floor(Math.random * 10),
      randomY: Math.floor(Math.random * 10),
    };
  };

  return {
    playRound,
    getGameStatus,
  };
}
