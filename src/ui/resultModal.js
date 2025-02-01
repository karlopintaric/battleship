export function ResultModal(resetGameCallback) {
  const resultDialog = document.querySelector("dialog");
  const modalPara = resultDialog.querySelector("p");
  const resetBtn = resultDialog.querySelector("button");

  resultDialog.addEventListener("keydown", (e) => {
    const key = e.key;
    if (key === "Escape") {
      _close(e);
    }
  });

  resetBtn.addEventListener("click", (e) => _close(e));

  const showResult = (result, player) => {
    if (result === "win") {
      modalPara.textContent = `Congratulations! ${player.name} is the winner!`;
    } else {
      modalPara.textContent = "You lost against the bot!";
    }

    resultDialog.showModal();
  };

  const _close = (e) => {
    e.preventDefault();
    resultDialog.close("");
    resetGameCallback();
  };

  return { showResult };
}
