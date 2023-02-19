import React, { useState, useEffect } from "react";
import Gameboard from "../Components/Gameboard";
import OpponentGameboard from "../Components/OpponentGameboard";
import "../App.css";
import { useSocketContext } from "../Contexts/SocketContext";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default function GamePage() {
  const socket = useSocketContext();

  const [waitingForGame, setWaitingForGame] = useState(false);
  const [gameFound, setGameFound] = useState(false);

  const joinGame = () => {
    setGameFound(false);
    setWaitingForGame(true);
    socket.emit("joinGame");
  };

  useEffect(() => {
    socket.on("connected", (text) => {
      console.log(text);
    });

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
  }, []);

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

  const [alert, setAlert] = useState("success");
  const [message, setMessage] = useState("It's your turn");

  const ref = ["", "A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];

  const [flag, setFlag] = useState();

  function changeFlag(boolean, string, message) {
    setFlag(boolean);
    setAlert(string);
    setMessage(message);
  }

  useEffect(() => {
    socket.on("playerTurn", (id) => {
      if (socket.id === id) {
        setFlag(false);
        setMessage("It's your turn");
        setAlert("success");
      } else {
        setFlag(true);
        setMessage("Opponents turn!");
        setAlert("danger");
      }
    });
    socket.on("changeTurn", (msg) => {
      setFlag(false);
      setMessage("It's your turn");
      setAlert("success");
    });
    socket.on("win", () => {
      console.log("You won");
    });
    socket.on("matchIsOver", () => {
      setGameFound(false);
    });
  }, []);

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
          <div className="turn">
            <Alert key={alert} variant={alert}>
              {message}
            </Alert>
            <Gameboard rows={row} columns={column} refs={ref} flag={flag} />
          </div>

          <OpponentGameboard
            rows={row}
            columns={column}
            refs={ref}
            flag={flag}
            changeFlag={changeFlag}
          />
        </div>
      )}
    </>
  );
}
