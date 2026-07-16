const Room = require("../models/Room");
const Game = require("../models/Game");

const {
  createGame,
  isPlayerTurn,
  nextTurn,
  moveToken,
} = require("../services/gameService");

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("🟢 User Connected");

    /* ===========================
            JOIN ROOM
    ============================ */

    socket.on("join-room", async (data) => {
      try {
        const roomCode =
          typeof data === "string"
            ? data
            : data.roomCode;

        socket.join(roomCode);

        const game = await Game.findOne({
          roomCode,
        });

        if (game) {
          socket.emit("game-state", game);
        }

        console.log(`🎮 Joined ${roomCode}`);
      } catch (err) {
        console.error("Join Room:", err);
      }
    });

    /* ===========================
            START GAME
    ============================ */

    socket.on("start-game", async ({ roomCode }) => {
      try {
        const room = await Room.findOne({
          roomCode,
        });

        if (!room) return;

        room.status = "playing";
        room.gameStarted = true;
        room.currentTurn = 0;

        await room.save();

        const game = await createGame(room);

        io.to(roomCode).emit(
          "game-started",
          game
        );

        io.to(roomCode).emit(
          "game-state",
          game
        );

        console.log(
          `🎲 Game Started : ${roomCode}`
        );
      } catch (err) {
        console.error("Start Game:", err);
      }
    });
/* ===========================
        RESTART GAME
=========================== */

socket.on("restart-game", async ({ roomCode }) => {
  try {

    const room = await Room.findOne({ roomCode });

    if (!room) return;

    await Game.deleteOne({
      roomCode,
    });

    const game = await createGame(room);

    io.to(roomCode).emit(
      "game-state",
      game
    );

    io.to(roomCode).emit(
      "restart-success"
    );

    console.log(
      `🔄 Game Restarted : ${roomCode}`
    );

  } catch (err) {
    console.error(err);
  }
});
    /* ===========================
            ROLL DICE
    ============================ */
    /* ---------------- ROLL DICE ---------------- */

    /* ===========================
        ROLL DICE
=========================== */
socket.on("roll-dice", async ({ roomCode, userId }) => {
  try {

    const game = await Game.findOne({ roomCode });

    if (!game) return;

    if (!isPlayerTurn(game, userId)) {
      socket.emit("roll-rejected");
      return;
    }

    // Don't allow rolling twice
    if (game.diceValue !== null) {
      return;
    }

    const dice = Math.floor(Math.random() * 6) + 1;

    game.diceValue = dice;

    await game.save();

    io.to(roomCode).emit(
      "game-state",
      game
    );

    console.log(
      `${game.players[game.currentTurn].username} rolled ${dice}`
    );

  } catch (err) {

    console.error("Roll Dice:", err);

  }
});
    /* ---------------- MOVE TOKEN ---------------- */

/* ===========================
        MOVE TOKEN
=========================== */
socket.on(
  "move-token",
  async ({ roomCode, userId, tokenNumber }) => {
    try {

      const game = await Game.findOne({ roomCode });

      if (!game) return;

      if (!isPlayerTurn(game, userId)) {
        socket.emit("roll-rejected");
        return;
      }

      if (game.diceValue === null) {
        return;
      }

      const currentPlayer = game.players[game.currentTurn];
      const color = currentPlayer.color.toLowerCase();

      // Save before move
      const rolledSix = game.diceValue === 6;

      const result = moveToken(
        game,
        color,
        tokenNumber
      );

      if (!result.success) {
        console.log(result.message);

        io.to(roomCode).emit(
          "game-state",
          game
        );

        return;
      }

      game.markModified("tokens");

      // Winner
      if (result.winner) {

        await game.save();

        io.to(roomCode).emit("game-over", {
          winner: currentPlayer.username,
          color: currentPlayer.color,
        });

        io.to(roomCode).emit("game-state", game);

        return;
      }

      if (rolledSix) {

        // Same player gets another roll
        game.diceValue = null;

        await game.save();

      } else {

        await nextTurn(game);

      }

      const updatedGame = await Game.findOne({
        roomCode,
      });

      io.to(roomCode).emit(
        "game-state",
        updatedGame
      );

      console.log(
        `${currentPlayer.username} moved token ${tokenNumber}`
      );

    } catch (err) {

      console.error("Move Token:", err);

    }
  }
);
/* ---------------- DISCONNECT ---------------- */

    socket.on("disconnect", () => {
      console.log("🔴 User Disconnected");
    });
  });
};