import { useCallback, useState, useEffect, useRef } from "react";

// Style
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
// Helpers
import generateFleet from "../Helpers/generateFleet";

// Context
import { useSocketContext } from "../Contexts/SocketContext";

export default function Gameboard(props) {
  const socket = useSocketContext();

  const [ships, setShips] = useState([
    { size: 4, sunk: false, boxes: [] },
    { size: 3, sunk: false, boxes: [] },
    { size: 2, sunk: false, boxes: [] },
    { size: 2, sunk: false, boxes: [] },
  ]);

  const [fleet, setFleet] = useState(null);

  const newFleet = useRef(null);
  const callFleet = useCallback((fleet) => {
    newFleet.current = [...fleet];
  }, []);

  useEffect(() => {
    if (fleet === null) {
      const { newFleet, newShips } = generateFleet(ships);
      setShips(newShips);
      setFleet(newFleet, callFleet(newFleet));
    }
  }, [callFleet, ships, fleet]);

  useEffect(() => {
    socket.on("coordinatesFromServer", (coordinates) => {
      const newShips = [...ships];
      let wasHit = false;

      const newCoords = coordinates.split(",");
      const coordsOne = parseInt(newCoords[0]);
      const coordsTwo = parseInt(newCoords[1]);

      newShips.forEach((ship) => {
        ship.boxes.forEach((box) => {
          if (box.coords.toString() === coordinates) {
            box.hit = true;
            wasHit = true;
          }
        });

        const shipPartsHit = ship.boxes.filter((box) => box.hit === true);

        if (shipPartsHit.length === ship.boxes.length) {
          ship.sunk = true;
        }
      });

      const sunkShips = newShips.filter((ship) => ship.sunk === true);

      if (sunkShips.length === 4) {
        socket.emit("gameOver");
        props.handleSetLose();
      }

      socket.emit("resultOfHit", {
        wasHit,
        shipsLeft: ships.length - sunkShips.length,
      });

      if (wasHit) {
        newFleet.current[0][coordsOne - 1][coordsTwo - 1].hitShip = true;
      }

      if (!wasHit) {
        newFleet.current[0][coordsTwo - 1][coordsOne - 1].hit = "splash";
      }

      setShips(newShips);
    });

    return () => {
      socket.off("coordinatesFromServer");
    };
  }, [props, ships, socket]);

  if (fleet === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="wrapper">
      <Container className="gameboard">
        <Row className="rad">
          {props.refs.map((letter, index) => (
            <div className="square" key={index}>
              {index}
            </div>
          ))}
        </Row>

        {fleet[0].map((array, fleetIndex) => (
          <Row className="rad" key={fleetIndex}>
            <div className="square" key={fleetIndex}>
              {props.columns[fleetIndex]}
            </div>
            {fleet[0][fleetIndex].map((ship, index) => (
              <div
                className="square"
                data-coords={[index + 1, fleetIndex + 1]}
                key={index}
              >
                <button
                  className={`
                  ${ship.ship !== null ? "active" : ""} 
                  ${ship.hit === "splash" ? "water" : ""}
                  ${ship.hit === true ? "hit" : ""}
                  `}
                  value={ship}
                  onClick={(e) =>
                    console.log(
                      ship,
                      e.target.parentElement.getAttribute("data-coords")
                    )
                  }
                >
                  {index + 1 + props.columns[fleetIndex]}
                </button>
              </div>
            ))}
          </Row>
        ))}
      </Container>
    </div>
  );
}
