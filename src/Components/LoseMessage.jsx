import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

function LoseMessage() {
  return (
    <Alert variant="danger">
      <h3>Sorry you lost!</h3>
      <hr />
      <Button
        className="play-again-btn"
        id="play-again"
        variant="info"
        as={Link}
        to="/"
      >
        Play again?
      </Button>
    </Alert>
  );
}

export default LoseMessage;
