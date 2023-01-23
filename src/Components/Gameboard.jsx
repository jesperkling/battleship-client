import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import useGenerateFleet from "../Hooks/useGenerateFleet";

export default function Gameboard(props) {
  const fleet = useGenerateFleet();

  return (
    <Container className="gameboard">
      <Row className="rad">
        {props.refs.map((letter, index) => (
          <Col className="square" key={index}>
            {letter}
          </Col>
        ))}
      </Row>
      {fleet[0].map((array, index) => (
        <Row className="rad" key={index}>
          <Col className="square" key={index}>
            {props.rows[index]}
          </Col>
          {fleet[0][index].map((ship, index) => (
            <Col className="square" key={index}>
              <button value={ship} onClick={(e) => console.log(ship)}>
                {index}
              </button>
            </Col>
          ))}
        </Row>
      ))}
    </Container>
  );
}
