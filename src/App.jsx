import "./App.css";
import GamePage from "./Pages/GamePage";
import StartPage from "./Pages/StartPage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container className="py-3">
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/gameboard" element={<GamePage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
