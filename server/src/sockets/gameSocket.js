const Room = require("../models/Room");
const Game = require("../models/Game");
const { createGame } = require("../services/gameService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User Connected");

    /* ---------------- JOIN ROOM ---------------- */

    socket.on("join-room", async (data) => {
      try {
        const roomCode =
          typeof data === "string"
            ? data
            : data.roomCode;

        socket.join(roomCode);

        console.log(`Player joined room ${roomCode}`);

        const game = await Game.findOne({ roomCode });

        if (game) {
          socket.emit("game-state", game);
        }
      } catch (err) {
        console.error(err);
      }
    });

    /* ---------------- START GAME ---------------- */

    socket.on("start-game", async ({ roomCode }) => {
      try {
        const room = await Room.findOne({ roomCode });

        if (!room) return;

        room.status = "playing";
        room.gameStarted = true;
        room.currentTurn = 0;

        await room.save();

        const game = await createGame(room);

        io.to(roomCode).emit("game-started", game);
        io.to(roomCode).emit("game-state", game);

        console.log(`🎮 Game Started : ${roomCode}`);
      } catch (err) {
        console.error(err);
      }
    });

    /* ---------------- ROLL DICE ---------------- */

    socket.on("roll-dice", async ({ roomCode }) => {
      try {
        const game = await Game.findOne({ roomCode });

        if (!game) return;

        game.diceValue = Math.floor(Math.random() * 6) + 1;

        await game.save();

        io.to(roomCode).emit("game-state", game);

        console.log(`🎲 Dice Rolled : ${game.diceValue}`);
      } catch (err) {
        console.error(err);
      }
    });

    /* ---------------- MOVE TOKEN ---------------- */

    socket.on("move-token", async () => {
      // Step 4.6
    });

    /* ---------------- DISCONNECT ---------------- */

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected");
    });
  });
};