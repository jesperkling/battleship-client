import React, { useState } from "react";
import Gameboard from "../Components/Gameboard";
import "../App.css";

export default function GamePage() {
  const [row, setRows] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [column, setColumns] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  const [ref, setRef] = useState([
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  return (
    <>
      <h1>Battleship Game</h1>
      <div className="gameUI">
        <Gameboard rows={row} columns={column} refs={ref} />
        <Gameboard rows={row} columns={column} refs={ref} />
      </div>
    </>
  );
}
