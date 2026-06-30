import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketContext";

function useLobbySocket({
  room,
  setRoom,
  roomCode,
  user,
}) {
  const navigate = useNavigate();
  const { socket, connected } = useSocket();

  useEffect(() => {
    if (!roomCode || !user) return;

    if (!connected) {
      socket.connect();
    }

    socket.emit("join-room", {
      roomCode,
      userId: user.userId,
      username: user.username,
    });

    const handleRoomUpdated = (updatedRoom) => {
      setRoom(updatedRoom);
    };

    const handlePlayerJoined = (player) => {
      console.log(`${player.username} joined.`);
    };

    const handlePlayerLeft = (player) => {
      console.log(`${player.username} left.`);
    };

    const handleGameStarted = () => {
      console.log("Game Started");
      navigate("/game");
    };

    socket.on("room-updated", handleRoomUpdated);
    socket.on("player-joined", handlePlayerJoined);
    socket.on("player-left", handlePlayerLeft);
    socket.on("game-started", handleGameStarted);

    return () => {
      socket.emit("leave-room", {
        roomCode,
        userId: user.userId,
      });

      socket.off("room-updated", handleRoomUpdated);
      socket.off("player-joined", handlePlayerJoined);
      socket.off("player-left", handlePlayerLeft);
      socket.off("game-started", handleGameStarted);
    };
  }, [
    connected,
    roomCode,
    user,
    socket,
    navigate,
    setRoom,
  ]);

  const startGame = () => {
    socket.emit("start-game", {
      roomCode,
      userId: user.userId,
    });
  };

  return {
    socket,
    startGame,
  };
}

export default useLobbySocket;