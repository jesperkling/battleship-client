import { useState } from "react";

const useGenerateFleet = () => {
  const [fleet, setFleet] = useState([
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ]);

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
    console.log("test:", test);

    let generate = true;
    let busy = false;

    while (generate === true) {
      if (test === 0) {
        busy = false;

        let length = getRandomInteger(0, 9);
        let row = getRandomInteger(0, 10 - size);
        console.log("length:", length, "row", row);

        row = row - 1;
        console.log("row first:", row);

        for (let i = 0; i < size; i++) {
          row++;

          if (fleet[row][length] !== null) {
            console.log("busy!");
            busy = true;
          }
        }
        console.log("busy!", busy);

        if (busy === false) {
          console.log("passed control", row);

          row = row - size;

          for (let i = 0; i < size; i++) {
            row++;
            fleet[row][length] = "ship" + size;
          }

          generate = false;
        }
      } else {
        busy = false;

        let length = getRandomInteger(0, 10 - size);
        let row = getRandomInteger(0, 9);
        console.log("length", length, "row", row);

        length = length - 1;

        for (let i = 0; i < size; i++) {
          length++;

          if (fleet[row][length] !== null) {
            console.log("Busy!!");
            busy = true;
          }
        }
        console.log("Busy", busy);
        if (busy === false) {
          console.log("passed control");
          length = length - size;

          for (let i = 0; i < size; i++) {
            length++;
            fleet[row][length] = "ship" + size;
            console.log("from if statement");
          }
          generate = false;
        }
      }
      console.log(busy);
    }

    if (test === 0) {
      let length = getRandomInteger(0, 9);
      let row = getRandomInteger(0, 10 - size);
      console.log("length:", length, "row:", row);

      row = row - 1;
      for (let i = 0; i < size; i++) {
        row++;
        fleet[row][length] = "ship" + size;
      }
    } else {
      let length = getRandomInteger(0, 10 - size);
      let row = getRandomInteger(0, 9);
      console.log("length:", length, "row:", row);

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
