import React, { useState } from "react";
import Gameboard from "../Components/Gameboard";
import OpponentGameboard from "../Components/OpponentGameboard";
import "../App.css";
import { useSocketContext } from "../Contexts/SocketContext";
import Button from "react-bootstrap/Button";

export default function GamePage() {
  const socket = useSocketContext();

  const [waitingForGame, setWaitingForGame] = useState(false);
  const [gameFound, setGameFound] = useState(false);

  socket.on("connected", (text) => {
    console.log(text);
  });
  const joinGame = () => {
    setGameFound(false);
    setWaitingForGame(true);
    socket.emit("joinGame");
  };
  socket.on("HiRoom", () => {
    console.log("Server said hi to your room");
  });
  socket.on("gameFound", () => {
    setWaitingForGame(false);
    setGameFound(true);
  });
  socket.on("userLeft", (message) => {
    console.log(message);
  });

  const [row, setRow] = useState([
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
  const [column, setColumn] = useState([
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
    "K",
  ]);

  const [flag, setFlag] = useState();
  socket.on("playerTurn", (id) => {
    if (socket.id === id) {
      setFlag(false);
      console.log("you start", flag);
    } else {
      setFlag(true);
      console.log("opponent turn", flag);
    }
  });

  return (
    <>
      <h1>Battleship Game</h1>
      <Button className="w-auto" disabled={waitingForGame} onClick={joinGame}>
        Join Game
      </Button>
      {waitingForGame && <p>Waiting for game...</p>}
      {gameFound && <p>Game found!</p>}
      {gameFound && (
        <div className="gameUI">
          <Gameboard rows={row} columns={column} refs={ref} flag={flag} />
          <OpponentGameboard
            rows={row}
            columns={column}
            refs={ref}
            flag={flag}
          />
        </div>
      )}
    </>
  );
}
