import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function LoseMessage() {
  return (
    <Alert variant="warning">
      <h3>Sorry you lost!</h3>
      <hr />
      <Button
        className="play-again-btn"
        id="play-again"
        variant="info"
        onClick=""
      >
        Play again?
      </Button>
    </Alert>
  );
}

export default LoseMessage;
