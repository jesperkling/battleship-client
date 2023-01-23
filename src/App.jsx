import "./App.css";
import GamePage from "./Pages/GamePage";
import Container from "react-bootstrap/Container";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Container>
        <Routes>
          <Route path="/gameboard" element={<GamePage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
