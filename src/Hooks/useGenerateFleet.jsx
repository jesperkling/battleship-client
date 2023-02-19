import { useState } from "react";

const useGenerateFleet = () => {
  const fleet = [
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
    [
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
      { hit: false, ship: null },
    ],
  ];

  const [ships, setShips] = useState([
    { size: 4, sunk: false },
    { size: 3, sunk: false },
    { size: 2, sunk: false },
    { size: 2, sunk: false },
  ]);

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateShip(ship) {
    let position = getRandomInteger(0, 1);

    let generate = true;

    let busy = false;

    while (generate === true) {
      if (position === 0) {
        busy = false;

        let length = getRandomInteger(0, 9);

        let row = getRandomInteger(0, 10 - ship.size);

        row = row - 1;

        for (let index = 0; index < ship.size; index++) {
          row++;

          if (fleet[row][length].ship !== null) {
            busy = true;
          }
        }

        if (busy === false) {
          row = row - ship.size;

          for (let index = 0; index < ship.size; index++) {
            row++;

            fleet[row][length].ship = ship;
          }
          generate = false;
        }
      } else {
        busy = false;

        let length = getRandomInteger(0, 10 - ship.size);

        let row = getRandomInteger(0, 9);

        length = length - 1;

        for (let index = 0; index < ship.size; index++) {
          length++;

          if (fleet[row][length].ship !== null) {
            busy = true;
          }
        }

        if (busy === false) {
          length = length - ship.size;

          for (let index = 0; index < ship.size; index++) {
            length++;

            fleet[row][length].ship = ship;
          }
          generate = false;
        }
      }
    }
  }

  generateShip(ships[0]);
  generateShip(ships[1]);
  generateShip(ships[2]);
  generateShip(ships[3]);

  return [fleet];
};

export default useGenerateFleet;
