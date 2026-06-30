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
    fetchGame();
  }, []);

  const fetchGame = async () => {
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
  };

  useEffect(() => {
    if (!roomCode) return;

    if (!connected) {
      socket.connect();
    }

    socket.emit("join-room", roomCode);

    socket.on("game-state", (updatedGame) => {
      setGame(updatedGame);
    });

    socket.on("game-over", (updatedGame) => {
      setGame(updatedGame);
    });

    return () => {
      socket.off("game-state");
      socket.off("game-over");
    };
  }, [connected]);

  const rollDice = () => {
    socket.emit("roll-dice", {
      roomCode,
      userId,
    });
  };

  const moveToken = (tokenId) => {
    socket.emit("move-token", {
      roomCode,
      userId,
      tokenId,
    });
  };

  return {
    game,
    loading,
    rollDice,
    moveToken,
  };
}

export default useGameSocket;