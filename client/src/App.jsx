import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Lobby from "./pages/Lobby";
import WaitingRoom from "./pages/WaitingRoom";
import Game from "./pages/Game";

function App() {
  return (
    <Routes>

      {/* Redirect Home */}

      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      {/* Authentication */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* Lobby */}

      <Route
        path="/lobby"
        element={<Lobby />}
      />

      {/* Waiting Room */}

      <Route
        path="/room"
        element={<WaitingRoom />}
      />

      {/* Game */}

      <Route
        path="/game"
        element={<Game />}
      />

      {/* Invalid URL */}

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default App;