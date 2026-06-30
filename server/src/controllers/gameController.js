const Game = require("../models/Game");

const getGameDetails = async (req, res) => {
  try {
    const { roomCode } = req.body;

    const game = await Game.findOne({ roomCode });

    if (!game) {
      return res.status(404).json({
        message: "Game not found.",
      });
    }

    res.json(game);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  getGameDetails,
};