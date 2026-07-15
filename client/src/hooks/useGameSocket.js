import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import api from "../services/api";

function useGameSocket() {
  const { socket, connected } = useSocket();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const [winner, setWinner] = useState(null);

  const roomCode = localStorage.getItem("roomCode");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchGame();
  }, []);

  async function fetchGame() {
    try {
      const res = await api.post("/game/details", {
        roomCode,
      });

      setGame(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!roomCode) return;

    if (!connected) {
      socket.connect();
    }

    socket.emit("join-room", roomCode);

    socket.on("game-state", (updatedGame) => {
      setGame(updatedGame);
    });

    socket.on("game-over", (data) => {
      setWinner(data);
    });

    socket.on("restart-success", () => {
      setWinner(null);
    });

    return () => {
      socket.off("game-state");
      socket.off("game-over");
      socket.off("restart-success");
    };
  }, [connected]);

  function rollDice() {
    socket.emit("roll-dice", {
      roomCode,
      userId,
    });
  }

  function moveToken(tokenNumber) {
    socket.emit("move-token", {
      roomCode,
      userId,
      tokenNumber,
    });
  }

  function restartGame() {
    socket.emit("restart-game", {
      roomCode,
    });
  }

  return {
    game,
    loading,
    rollDice,
    moveToken,
    winner,
    restartGame,
  };
}

export default useGameSocket;