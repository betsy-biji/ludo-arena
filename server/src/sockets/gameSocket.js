const Room = require("../models/Room");
const { createGame } = require("../services/gameService");
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 Socket Connected: ${socket.id}`);

    /* ---------------- JOIN ROOM ---------------- */

    socket.on("join-room", async (data) => {
      try {
        const { roomCode } = data;

        if (!roomCode) return;

        socket.join(roomCode);

        console.log(`${socket.id} joined ${roomCode}`);

        const room = await Room.findOne({ roomCode });

        if (!room) return;

        io.to(roomCode).emit("room-updated", room);

        io.to(roomCode).emit("player-joined", {
          username: data.username,
        });

      } catch (err) {
        console.log(err);
      }
    });

    /* ---------------- LEAVE ROOM ---------------- */

    socket.on("leave-room", async (data) => {
      try {
        const { roomCode, userId } = data;

        socket.leave(roomCode);

        const room = await Room.findOne({ roomCode });

        if (!room) return;

        const player = room.players.find(
          (p) => p.userId.toString() === userId
        );

        io.to(roomCode).emit("player-left", {
          username: player?.username || "Player",
        });

        io.to(roomCode).emit("room-updated", room);

      } catch (err) {
        console.log(err);
      }
    });

    /* ---------------- START GAME ---------------- */

    socket.on("start-game", async (data) => {
  try {
    const { roomCode } = data;

    const room = await Room.findOne({ roomCode });

    if (!room) return;

    room.status = "playing";
    room.gameStarted = true;
    room.currentTurn = 0;

    await room.save();

    const game = await createGame(room);

    io.to(roomCode).emit("game-started", game);

    console.log(`🎮 Game Created : ${roomCode}`);

  } catch (err) {
    console.log(err);
  }
});

    /* ---------------- DISCONNECT ---------------- */

    socket.on("disconnect", () => {
      console.log(`🔴 Socket Disconnected: ${socket.id}`);
    });

  });
};