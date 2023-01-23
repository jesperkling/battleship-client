import "./App.css";
import GamePage from "./Pages/GamePage";
import StartPage from "./Pages/StartPage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";
import SocketContext from "./Contexts/SocketContext";

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
