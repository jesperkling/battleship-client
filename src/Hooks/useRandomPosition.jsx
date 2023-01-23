import { useEffect, useState } from "react";

const useRandomPosition = () => {
  const coordinates = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
  ];
  const [boats, setBoats] = useState([
    { size: 4, coordinate: [] },
    { size: 3, coordinate: [] },
    { size: 2, coordinate: [] },
    { size: 2, coordinate: [] },
  ]);

  const boatCoordinates = [
    "C1",
    "C2",
    "C3",
    "C4",
    "C5",
    "C6",
    "C7",
    "C8",
    "C9",
    "C10",
    "B1",
    "B2",
    "B3",
    "B4",
    "B5",
    "B6",
    "B7",
    "B8",
    "B9",
    "B10",
  ];

  function getRandomInteger(max) {
    return Math.floor(Math.random() * max);
  }

  function getCoordinates(size) {
    let align = getRandomInteger(2);
    let opposite;

    if (align === 0) {
      opposite = 1;
    } else {
      opposite = 0;
    }

    let interval = getRandomInteger(10 - size);
    let start = coordinates[align][interval];
    let array = [];

    for (let i = 0; i < size; i++) {
      const lengthCoord = coordinates[opposite][interval++];
      let startCoord = start;
      let coord;

      if (typeof startCoord === "string") {
        coord = startCoord + lengthCoord;
      } else {
        coord = lengthCoord + startCoord;
      }

      coord = coord.toString();

      array.push(coord);
    }
    return array;
  }

  useEffect(() => {
    function checkBoat(boat) {
      for (let i = 0; i < boat.length; i++) {
        const element = boat[i];

        if (boatCoordinates.includes(element)) {
          console.log("already exists", boat.length, boat);
          boat = getCoordinates(boat.length);
          console.log("new boat", boat);
        }
      }
      return boat;
    }

    let boat4 = checkBoat(getCoordinates(4));
    for (let i = 0; i < boat4.length; i++) {
      const element = boat4[i];
      boatCoordinates.push(element);
    }

    let boat3 = checkBoat(getCoordinates(3));
    for (let i = 0; i < boat3.length; i++) {
      const element = boat3[i];
      boatCoordinates.push(element);
    }

    let boat2one = checkBoat(getCoordinates(2));
    for (let i = 0; i < boat2one.length; i++) {
      const element = boat2one[i];
      boatCoordinates.push(element);
    }

    let boat2two = checkBoat(getCoordinates(2));
    for (let i = 0; i < boat2two.length; i++) {
      const element = boat2two[i];
      boatCoordinates.push(element);
    }

    setBoats(
      (boats[0].coordinate = [...boat4]),
      (boats[1].coordinate = [...boat3]),
      (boats[2].coordinate = [...boat2one]),
      (boats[3].coordinate = [...boat2two])
    );

    console.log(boatCoordinates);
    console.log("The fleet", boats);
  }, []);

  return [boats];
};

export default useRandomPosition;
