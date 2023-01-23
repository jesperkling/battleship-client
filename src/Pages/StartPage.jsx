import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";

export default function StartPage() {
  return (
    <div>
      <Container>
        <h2>Battleship Game</h2>
        <form>
          <input type="text" placeholder="Username" />
        </form>
        <Button variant="info" as={Link} to="/gameboard" onClick="">
          Start Game
        </Button>
      </Container>
    </div>
  );
}
