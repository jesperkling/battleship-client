import { useCallback, useEffect, useState } from "react";

// Style
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

// Context
import { useSocketContext } from "../Contexts/SocketContext";

let lastHitPosition = null;

export default function Gameboard(props) {
  const generateBoard = useCallback(() => {
    let initialBoard = [];

    for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
      initialBoard.push([]);

      for (let index = 0; index < 10; index++) {
        initialBoard[rowIndex].push({
          hitShip: false,
          hitWater: false,
          coords: [index + 1, rowIndex + 1],
        });
      }
    }
    return initialBoard;
  }, []);

  const socket = useSocketContext();
  const [fleet, setFleet] = useState([generateBoard()]);

  useEffect(() => {
    socket.on("resultOfHit", (data) => {
      const newFleet = [...fleet];

      if (data.wasHit) {
        newFleet[0][lastHitPosition[1] - 1][
          lastHitPosition[0] - 1
        ].hitShip = true;
      }

      if (!data.wasHit) {
        newFleet[0][lastHitPosition[1] - 1][
          lastHitPosition[0] - 1
        ].hitWater = true;
      }
      setFleet(newFleet);
    });

    return () => {
      socket.off("resultOfHit");
    };
  }, [fleet, socket]);

  return (
    <Container className="gameboard opponent">
      <Row className="rad">
        {props.refs.map((letter, index) => (
          <Col className="square" key={index}>
            {index}
          </Col>
        ))}
      </Row>

      {fleet[0].map((array, fleetIndex) => (
        <Row className="rad" key={fleetIndex}>
          <Col className="square" key={fleetIndex}>
            {props.columns[fleetIndex]}
          </Col>
          {fleet[0][fleetIndex].map((ship, index) => (
            <Col
              className="square"
              data-coords={[index + 1, fleetIndex + 1]}
              key={index}
            >
              <button
                disabled={props.flag || ship.hitShip || ship.hitWater}
                className={`${ship.hitShip === true ? "active" : ""} ${
                  ship.hitWater === true ? "miss" : ""
                }`}
                value={ship}
                onClick={(e) => {
                  console.log(
                    ship,
                    e.target.parentElement.getAttribute("data-coords")
                  );
                  lastHitPosition = ship.coords;
                  socket.emit(
                    "coordinates",
                    e.target.parentElement.getAttribute("data-coords")
                  );
                  socket.emit("madeMyMove", "Your turn!");
                  props.changeFlag(true, "danger", "Opponents turn!");
                }}
              >
                {index + 1 + props.columns[fleetIndex]}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
