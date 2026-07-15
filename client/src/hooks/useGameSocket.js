import { useEffect, useState } from "react";
import { useSocket } from "../context/SocketContext";
import api from "../services/api";

function useGameSocket() {
  const { socket, connected } = useSocket();

  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);

  const roomCode = localStorage.getItem("roomCode");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (roomCode) {
      fetchGame();
    }
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

    socket.emit("join-room", { roomCode });

    function handleGameState(updatedGame) {
      setGame(updatedGame);
    }

    socket.on("game-state", handleGameState);

    return () => {
      socket.off("game-state", handleGameState);
    };
  }, [socket, connected, roomCode]);

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

  return {
    game,
    loading,
    rollDice,
    moveToken,
  };
}

export default useGameSocket;