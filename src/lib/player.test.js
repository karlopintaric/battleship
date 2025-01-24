import Player from "./player";

test("Player has name", () => {
  const player = new Player("Karlo", "human");

  expect(player.playerName).toBeDefined();
});
