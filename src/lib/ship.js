export default function Ship(length) {
  let health = length;

  const hit = () => {
    if (health > 0) {
      health--;
    }
  };

  const isSunk = () => health == 0;

  return {
    hit,
    isSunk,
  };
}
