const Room = require("../models/Room");
const generateRoomCode = require("../utils/generateRoomCode");
const { getIO } = require("../socket");

const colors = ["red", "green", "yellow", "blue"];

/*
|--------------------------------------------------------------------------
| Create Room
|--------------------------------------------------------------------------
*/

exports.createRoom = async (req, res) => {
  try {
    const io = getIO();

    const roomCode = generateRoomCode();

    const room = await Room.create({
      roomCode,

      host: req.user.id,

      players: [
        {
          userId: req.user.id,
          username: req.user.username,
          color: "red",
          connected: true,
        },
      ],

      status: "waiting",

      gameStarted: false,
    });

    io.emit("room-created", room);

    res.json(room);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed To Create Room",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Join Room
|--------------------------------------------------------------------------
*/

exports.joinRoom = async (req, res) => {
  try {
    const io = getIO();

    const { roomCode } = req.body;

    const room = await Room.findOne({
      roomCode,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room Not Found",
      });
    }

    const existingPlayer = room.players.find(
      (player) =>
        player.userId.toString() === req.user.id
    );

    if (existingPlayer) {
      existingPlayer.connected = true;

      await room.save();

      io.to(room.roomCode).emit(
        "room-updated",
        room
      );

      return res.json(room);
    }

    if (room.players.length >= 4) {
      return res.status(400).json({
        message: "Room Full",
      });
    }

    room.players.push({
      userId: req.user.id,
      username: req.user.username,
      color: colors[room.players.length],
      connected: true,
    });

    await room.save();

    io.to(room.roomCode).emit(
      "room-updated",
      room
    );

    io.to(room.roomCode).emit(
      "player-joined",
      {
        username: req.user.username,
      }
    );

    res.json(room);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed To Join Room",
    });
  }
};

/*
|--------------------------------------------------------------------------
| Room Details
|--------------------------------------------------------------------------
*/

exports.roomDetails = async (req, res) => {
  try {
    const { roomCode } = req.body;

    const room = await Room.findOne({
      roomCode,
    });

    if (!room) {
      return res.status(404).json({
        message: "Room Not Found",
      });
    }

    res.json(room);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error Fetching Room",
    });
  }
};
