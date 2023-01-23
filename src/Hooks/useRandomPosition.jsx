import { useEffect, useState } from "react";

export default function useRandomPosition() {
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
    let first = coordinates[align][interval];
    let array = [];

    for (let i = 0; i < size; i++) {
      const secondCoord = coordinates[opposite][interval++];
      let firstCoord = first;
      let coord;

      if (typeof firstCoord === "string") {
        coord = firstCoord + secondCoord;
      } else {
        coord = secondCoord + firstCoord;
      }

      if (boatCoordinates.includes(coord)) {
        return;
      }

      array.push(coord.toString());
    }
    return array;
  }

  useEffect(() => {
    let generatedCoordinates = getCoordinates(4);
    console.log(generatedCoordinates);

    for (let i = 0; i < generatedCoordinates.length; i++) {
      const element = generatedCoordinates[i];

      if (boatCoordinates.includes(element)) {
        return;
      }

      boats[0].coordinate.push(generatedCoordinates[i]);
      console.log("Coordinates", boats[0].coordinate);
    }
  }, []);

  return [boats];
}
