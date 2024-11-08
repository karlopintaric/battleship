import Ship from "./ship";

test("Ship not sunk", () => {
    const ship = new Ship(3);
    expect(ship.isSunk()).toBe(false)
}) 

test("Sink ship", () => {
    const ship = new Ship(2);
    ship.hit();
    ship.hit()
    expect(ship.isSunk()).toBe(true);
})