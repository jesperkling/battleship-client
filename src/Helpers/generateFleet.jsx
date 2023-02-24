const generateFleet = (ships) => {
  let initialBoard = [];

  const generateBoard = () => {
    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      initialBoard.push([]);

      for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
        initialBoard.push([]);

        for (let index = 0; index < 10; index++) {
          initialBoard[rowIndex].push({
            hit: false,
            ship: null,
            coords: [index + 1, rowIndex + 1],
          });
        }
      }
    }
  };

  generateBoard();

  const newShips = [...ships];

  const fleet = initialBoard;

  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function generateShip(ship, shipsIndex) {
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
            fleet[row][length].ship.boxes.push(fleet[row][length]);
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
            fleet[row][length].ship.boxes[index] = fleet[row][length];
          }
          generate = false;
        }
      }
    }
  }

  generateShip(newShips[0], 0);
  generateShip(newShips[1], 1);
  generateShip(newShips[2], 2);
  generateShip(newShips[3], 3);

  return { newFleet: [fleet], newShips: newShips };
};

export default generateFleet;
