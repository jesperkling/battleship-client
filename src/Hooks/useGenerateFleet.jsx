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
    { size: 4, coordinates: [], sunk: false },
    { size: 3, coordinates: [], sunk: false },
    { size: 2, coordinates: [], sunk: false },
    { size: 2, coordinates: [], sunk: false },
  ]);

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateShip(size) {
    let test = getRandomInteger(0, 1);

    let generate = true;
    let busy = false;

    while (generate === true) {
      if (test === 0) {
        busy = false;

        let length = getRandomInteger(0, 9);
        let row = getRandomInteger(0, 10 - size);

        row = row - 1;

        for (let i = 0; i < size; i++) {
          row++;

          if (fleet[row][length].ship !== null) {
            busy = true;
          }
        }

        if (busy === false) {
          row = row - size;

          for (let i = 0; i < size; i++) {
            row++;
            const found = ships.find((ship) => ship.size === size);
            fleet[row][length] = found;
          }

          generate = false;
        }
      } else {
        busy = false;

        let length = getRandomInteger(0, 10 - size);
        let row = getRandomInteger(0, 9);

        length = length - 1;

        for (let i = 0; i < size; i++) {
          length++;

          if (fleet[row][length].ship !== null) {
            busy = true;
          }
        }
        if (busy === false) {
          length = length - size;

          for (let i = 0; i < size; i++) {
            length++;
            const found = ships.find((ship) => ship.size === size);
            fleet[row][length] = found;
          }
          generate = false;
        }
      }
    }

    if (test === 0) {
      let length = getRandomInteger(0, 9);
      let row = getRandomInteger(0, 10 - size);

      row = row - 1;
      for (let i = 0; i < size; i++) {
        row++;
        fleet[row][length] = "ship" + size;
      }
    } else {
      let length = getRandomInteger(0, 10 - size);
      let row = getRandomInteger(0, 9);

      length = length - 1;

      for (let i = 0; i < size; i++) {
        length++;
        fleet[row][length] = "ship" + size;
      }
    }
  }

  generateShip(4);
  generateShip(3);

  return [fleet];
};

export default useGenerateFleet;
