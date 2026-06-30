const Game = require("../models/Game");

function createTokens(color) {
  return Array.from({ length: 4 }, (_, index) => ({
    color,
    tokenNumber: index,
    position: -1,
    isHome: true,
    isFinished: false,
  }));
}

async function createGame(room) {
  const existingGame = await Game.findOne({
    roomId: room._id,
  });

  if (existingGame) {
    return existingGame;
  }

  const game = new Game({
    roomId: room._id,
    roomCode: room.roomCode,

    players: room.players.map((player) => ({
      userId: player.userId,
      username: player.username,
      color: player.color,
    })),

    currentTurn: 0,

    diceValue: null,

    gameStarted: true,

    winner: null,

    tokens: {
      red: createTokens("red"),
      green: createTokens("green"),
      yellow: createTokens("yellow"),
      blue: createTokens("blue"),
    },
  });

  await game.save();

  return game;
}

module.exports = {
  createGame,
};