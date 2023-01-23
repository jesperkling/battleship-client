import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../App.css";

export default function GamePage() {
  const [row, setRows] = useState([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ]);
  const [column, setColumns] = useState([
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  const [index, setIndex] = useState([
    "",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  return (
    <>
      <h1>Battleship Game</h1>
      <div className="gameUI">
        <Container className="gameboard">
          <Row className="row">
            {index.map((value, index) => (
              <Col className="square" key={index}>
                {value}
              </Col>
            ))}
          </Row>
          {row.map((object, index) => (
            <Row className="row" key={index}>
              <Col className="square" key={index}>
                {row[index]}
              </Col>
              {column.map((value, index) => (
                <Col className="square" key={index}>
                  <button
                    onClick={(e) =>
                      console.log(row[object - 1] + column[index])
                    }
                  >
                    {row[object - 1]}
                    {column[index]}
                  </button>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
        <Container className="gameboard">
          <Row className="row">
            {index.map((value, index) => (
              <Col className="square" key={index}>
                {value}
              </Col>
            ))}
          </Row>
          {row.map((object, index) => (
            <Row className="row" key={index}>
              <Col className="square" key={index}>
                {row[index]}
              </Col>
              {column.map((value, index) => (
                <Col className="square" key={index}>
                  <button
                    onClick={(e) =>
                      console.log(row[object - 1] + column[index])
                    }
                  >
                    {row[object - 1]}
                    {column[index]}
                  </button>
                </Col>
              ))}
            </Row>
          ))}
        </Container>
      </div>
    </>
  );
}
