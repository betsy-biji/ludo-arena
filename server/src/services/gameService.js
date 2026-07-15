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

function isPlayerTurn(game, userId) {
  if (!game) return false;

  const player = game.players[game.currentTurn];

  if (!player) return false;

  return player.userId.toString() === userId.toString();
}

/* -------------------- GAME RULES -------------------- */

function canLeaveHome(game) {
  return game.diceValue === 6;
}

function getToken(game, color, tokenNumber) {
  return game.tokens[color][tokenNumber];
}

function leaveHome(game, color, tokenNumber) {
  const token = getToken(game, color, tokenNumber);

  if (!token) return false;

  if (!token.isHome) return false;

  if (!canLeaveHome(game)) return false;

  token.position = 0;
  token.isHome = false;

  return true;
}
function sendTokenHome(game, color, tokenNumber) {
  const token = getToken(game, color, tokenNumber);

  if (!token) return;

  token.position = -1;
  token.isHome = true;
  token.isFinished = false;
}

function moveToken(game, color, tokenNumber) {
  const token = getToken(game, color, tokenNumber);

  if (!token) {
    return {
      success: false,
      message: "Token not found",
    };
  }

  if (token.isFinished) {
    return {
      success: false,
      message: "Token already finished",
    };
  }

  // ---------- HOME ----------
  if (token.isHome) {
    if (!canLeaveHome(game)) {
      return {
        success: false,
        message: "Need a 6",
      };
    }

    leaveHome(game, color, tokenNumber);

    return {
      success: true,
      leftHome: true,
    };
  }

  const PATH_LENGTH = 52;

  const newPosition =
    token.position + game.diceValue;

  // ---------- Cannot cross finish ----------
  if (newPosition > PATH_LENGTH) {
    return {
      success: false,
      message: "Need exact number",
    };
  }
token.position = newPosition;

// ---------- Capture ----------
Object.entries(game.tokens).forEach(([enemyColor, enemyTokens]) => {

  if (enemyColor === color) return;

  enemyTokens.forEach((enemyToken) => {

    if (enemyToken.isHome) return;

    if (enemyToken.isFinished) return;

    if (enemyToken.position === token.position) {

      enemyToken.position = -1;
      enemyToken.isHome = true;
      enemyToken.isFinished = false;

    }

  });

});

// ---------- Finish ----------
if (token.position === PATH_LENGTH) {
  token.isFinished = true;
}

return {
  success: true,
  moved: true,
  finished: token.isFinished,
};
}
async function nextTurn(game) {

  /*
      Standard Ludo Rule

      Roll 6
      →
      Extra Turn
  */

  if (game.diceValue === 6) {
    game.diceValue = null;

    await game.save();

    return game;
  }

  game.currentTurn =
    (game.currentTurn + 1) %
    game.players.length;

  game.diceValue = null;

  await game.save();

  return game;
}

module.exports = {
  createGame,
  isPlayerTurn,
  nextTurn,
  canLeaveHome,
  leaveHome,
  moveToken,
  sendTokenHome,
};