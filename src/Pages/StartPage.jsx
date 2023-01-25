import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <>
      <Container className="p-5">
        <Form>
          <Form.Group className="p-5">
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>
          <Button variant="warning" as={Link} to="/gameboard" onClick="">
            Start Game
          </Button>
        </Form>
      </Container>
    </>
  );
}
