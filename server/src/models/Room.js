const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomCode: {
      type: String,
      unique: true,
      required: true,
    },

    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    players: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        username: {
          type: String,
          required: true,
        },

        color: {
          type: String,
          required: true,
        },

        connected: {
          type: Boolean,
          default: true,
        },
      },
    ],

    status: {
      type: String,
      enum: [
        "waiting",
        "playing",
        "finished",
      ],
      default: "waiting",
    },

    gameStarted: {
      type: Boolean,
      default: false,
    },

    currentTurn: {
      type: Number,
      default: 0,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Room", roomSchema);