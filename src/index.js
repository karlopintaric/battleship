import "./styles.css";
import GameController from "./lib/gameController";
import renderBoard from "./ui/board";

(function ScreenController() {
  const game = GameController();

  const playerBoardDiv = document.querySelector(".board-player");
  const cpuBoardDiv = document.querySelector(".board-enemy");

  // Initialize and render both boards in one place
  const _renderBoards = () => {
    renderBoard(game.getBoardAndShots("human"), playerBoardDiv);
    renderBoard(game.getBoardAndShots("cpu"), cpuBoardDiv);
  };

  // Call the initialization function
  _renderBoards();
})();
