import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import GamePage from "./Pages/GamePage";
import StartPage from "./Pages/StartPage";
import SocketContext from "./Contexts/SocketContext";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <SocketContext>
        <Routes>
          <Route path="/" element={<StartPage />} />
          <Route path="/gameboard" element={<GamePage />} />
        </Routes>
      </SocketContext>
    </div>
  );
}

export default App;
