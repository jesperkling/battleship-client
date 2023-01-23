import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div>
      <Container>
        <h2>Battleship Game</h2>
        <Form>
          <Form.Group>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
        </Form>
        <Button variant="info" as={Link} to="/gameboard" onClick="">
          Start Game
        </Button>
      </Container>
    </div>
  );
}
