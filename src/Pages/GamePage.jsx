import React, { useState, useEffect } from "react";

// Components
import Gameboard from "../Components/Gameboard";
import OpponentGameboard from "../Components/OpponentGameboard";
import LoseMessage from "../Components/LoseMessage";
import WinMessage from "../Components/WinMessage";

// Style
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Battleship from "../Assets/images/battleship-icon.svg";

// Context
import { useSocketContext } from "../Contexts/SocketContext";

export default function GamePage() {
  const socket = useSocketContext();

  const [waitingForGame, setWaitingForGame] = useState(false);
  const [gameFound, setGameFound] = useState(false);
  const [gameInProgress, setGameInProgress] = useState(false);
  const [opponentShipsLeft, setOpponentShipsLeft] = useState(4);

  const joinGame = () => {
    setGameFound(false);
    setWaitingForGame(true);
    setLose(false);
    setWin(false);
    setOpponentShipsLeft(4);
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
      setGameInProgress(true);
      setGameFound(false);
    });

    socket.on("userLeft", (message) => {
      console.log(message);
      setGameInProgress(false);
      setWin(true);
    });

    return () => {
      socket.off("connected");
      socket.off("HiRoom");
      socket.off("gameFound");
      socket.off("userLeft");
    };
  }, [socket]);

  const row = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const column = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  const [alert, setAlert] = useState("success");
  const [message, setMessage] = useState("It's your turn");

  const ref = ["", "A", "B", "C", "D", "F", "G", "H", "I", "J", "K"];

  const [flag, setFlag] = useState();
  const [win, setWin] = useState(false);
  const [lose, setLose] = useState(false);

  const handleSetLose = () => {
    setLose(true);
  };

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
    socket.on("changeTurn", () => {
      setFlag(false);
      setMessage("It's your turn");
      setAlert("success");
    });
    socket.on("win", () => {
      setWin(true);
    });
    socket.on("matchIsOver", () => {
      setGameInProgress(false);
    });
    socket.on("shipsLeft", (data) => {
      if (data) {
        setOpponentShipsLeft(data.shipsLeft);
      }
    });

    return () => {
      socket.off("playerTurn");
      socket.off("changeTurn");
      socket.off("win");
      socket.off("matchIsOver");
      socket.off("shipsLeft");
    };
  }, [flag, socket]);

  return (
    <>
      <div className={`text-center ${gameInProgress === true ? "d-none" : ""}`}>
        <img src={Battleship} alt="battleship" />
        <Button className="w-auto" disabled={waitingForGame} onClick={joinGame}>
          Join Game
        </Button>
      </div>

      {waitingForGame && <p>Waiting for game...</p>}

      {gameFound && <p>Game found!</p>}

      {win && <WinMessage />}

      {lose && <LoseMessage />}

      {gameInProgress && (
        <>
          <div>
            <p>Opponents ships left: {opponentShipsLeft}</p>
          </div>

          <div className="gameUI">
            <div className="turn">
              <Alert key={alert} variant={alert}>
                {message}
              </Alert>

              <Gameboard
                handleSetLose={handleSetLose}
                rows={row}
                columns={column}
                refs={ref}
                flag={flag}
              />
            </div>

            <OpponentGameboard
              rows={row}
              columns={column}
              refs={ref}
              flag={flag}
              changeFlag={changeFlag}
            />
          </div>
        </>
      )}
    </>
  );
}
