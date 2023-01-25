import { useState } from "react";
import { useSocketContext } from "../Contexts/SocketContext";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGenerateFleet from "../Hooks/useGenerateFleet";
import "../App.css";

let initialBoard = [];

const generateBoard = () => {
  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    initialBoard.push([]);

    for (let i = 0; i < 10; i++) {
      initialBoard[rowIndex].push({ hitShip: false, missShip: false });
    }
  }
};

generateBoard();

export default function OpponentGameboard(props) {
  const socket = useSocketContext();
  const [fleet, setFleet] = useState([initialBoard]);

  fleet[0][0][0].hitShip = true;

  socket.on("coordinatesFromServer", (coordinates) => {
    console.log(typeof coordinates);
    console.log("Coordinates from server", coordinates);
  });

  return (
    <Container className="gameboard">
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
                className={`${ship.hitShip === true ? "hit" : ""}`}
                disabled={props.flag || ship.hitShip}
                value={ship}
                onClick={(e) => {
                  console.log(
                    ship,
                    e.target.parentElement.getAttribute("data-coords")
                  );
                  socket.emit(
                    "coordinates",
                    e.target.parentElement.getAttribute("data-coords")
                  );
                  socket.emit("madeMove", "Your turn");
                  props.changeflag(true);
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
