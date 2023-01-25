import { useState } from "react";
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

export default function Gameboard(props) {
  const [ships, setShips] = useState([
    { size: 4, sunk: false, boxes: {} },
    { size: 3, sunk: false, boxes: {} },
    { size: 2, sunk: false, boxes: {} },
    { size: 2, sunk: false, boxes: {} },
  ]);

  const handleShipsState = (ships) => {
    setShips(ships);
  };

  const [fleet, setFleet] = useState([initialBoard]);

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
                className={`${ship !== null ? "active" : ""}`}
                // disabled={ship.hit}
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
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
