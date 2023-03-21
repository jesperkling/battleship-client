import React from "react";

// Style
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Battleship from "../Assets/images/battleship.png";

// Router
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <>
      <Container className="p-5 button-box">
        <Col>
          <Row>
            <h1 className="text-white">Battleship</h1>
          </Row>

          <img className="battleship-img" src={Battleship} alt="battleship" />
        </Col>
        <Form>
          <Form.Group className="p-5">
            <Form.Control
              id="form-username"
              type="text"
              placeholder="Username"
            />
          </Form.Group>
          <Button id="join-button" variant="warning" as={Link} to="/gameboard">
            Start Game
          </Button>
        </Form>
      </Container>
    </>
  );
}
