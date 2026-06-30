const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },

    tokenNumber: {
      type: Number,
      required: true,
    },

    position: {
      type: Number,
      default: -1,
    },

    isHome: {
      type: Boolean,
      default: true,
    },

    isFinished: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
  }
);

const gameSchema = new mongoose.Schema(
  {
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      unique: true,
    },

    roomCode: {
      type: String,
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
      },
    ],

    currentTurn: {
      type: Number,
      default: 0,
    },

    diceValue: {
      type: Number,
      default: null,
    },

    gameStarted: {
      type: Boolean,
      default: false,
    },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    tokens: {
      red: [tokenSchema],
      green: [tokenSchema],
      yellow: [tokenSchema],
      blue: [tokenSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", gameSchema);