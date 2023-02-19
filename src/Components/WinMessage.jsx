import React from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function WinMessage() {
  return (
    <Alert variant="success">
      <h3>Congratulation you won!</h3>
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

export default WinMessage;
