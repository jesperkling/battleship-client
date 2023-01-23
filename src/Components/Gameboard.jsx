import { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGenerateFleet from "../Hooks/useGenerateFleet";
import "../App.css";

export default function Gameboard(props) {
  const [fleet, setFleet] = useState(useGenerateFleet());

  const updateFleet = () => {
    const newFleet = [...fleet];
    newFleet[0][0][0] = true;
    setFleet(newFleet);
  };

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
      <button onClick={updateFleet}>Update board</button>
    </Container>
  );
}
