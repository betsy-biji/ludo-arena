const { nanoid } = require("nanoid");

const generateRoomCode = () => {
  return nanoid(6).toUpperCase();
};

module.exports = generateRoomCode;