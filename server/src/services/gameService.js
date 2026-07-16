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
function captureTokens(game, color, position) {

  const START_INDEX = {
    red: 0,
    green: 13,
    yellow: 26,
    blue: 39,
  };

  // Safe cells
  if (isSafeCell(position)) {
    return;
  }

  // Convert to absolute board index
  const myAbsolute =
    (START_INDEX[color] + position) % 52;

  Object.entries(game.tokens).forEach(
    ([enemyColor, enemyTokens]) => {

      if (enemyColor === color) return;

      enemyTokens.forEach((enemy) => {

        if (enemy.isHome) return;

        if (enemy.isFinished) return;

        const enemyAbsolute =
          (START_INDEX[enemyColor] + enemy.position) % 52;

        if (enemyAbsolute === myAbsolute) {

          enemy.position = -1;
          enemy.isHome = true;
          enemy.isFinished = false;

          console.log(
            `${enemyColor} token sent home`
          );

        }

      });

    }
  );

}
function checkWinner(game, color) {
  const tokens = game.tokens[color];

  const finished = tokens.filter(
    (token) => token.isFinished
  ).length;

  if (finished === 4) {
    game.winner = color;
    return true;
  }

  return false;
}
const SAFE_CELLS = [0, 8, 13, 21, 26, 34, 39, 47];

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

  // ---------------- HOME ----------------

  if (token.isHome) {

    if (game.diceValue !== 6) {
      return {
        success: false,
        message: "Need a 6",
      };
    }

    token.isHome = false;
    token.position = 0;

    captureTokens(game, color, token.position);

    return {
      success: true,
      moved: true,
      winner: false,
    };
  }

  const LAST_POSITION = 51;

  const newPosition = token.position + game.diceValue;

  // Need exact number only on the last square
  if (newPosition > LAST_POSITION) {

    return {
      success: false,
      message: "Need exact number",
    };

  }

  token.position = newPosition;

  captureTokens(
    game,
    color,
    token.position
  );

  if (token.position === LAST_POSITION) {

    token.isFinished = true;

  }

  const won = checkWinner(game, color);

  return {

    success: true,

    moved: true,

    finished: token.isFinished,

    winner: won,

  };

}
async function nextTurn(game) {

  // Always clear the previous dice
  game.diceValue = null;

  // Move to next player
  game.currentTurn =
    (game.currentTurn + 1) %
    game.players.length;

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
  captureTokens,
  checkWinner,
};