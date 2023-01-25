import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GamePage from "./Pages/GamePage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import SocketContext from "./Contexts/SocketContext";
import StartPage from "./Pages/StartPage";

function App() {
  return (
    <div className="App">
      <SocketContext>
        <Container>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/gameboard" element={<GamePage />} />
          </Routes>
        </Container>
      </SocketContext>
    </div>
  );
}

export default App;
