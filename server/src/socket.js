let io = null;

/**
 * Initialize Socket.io instance.
 * Called once from server.js
 */
function initSocket(socketServer) {
  io = socketServer;
}

/**
 * Get the initialized Socket.io instance.
 */
function getIO() {
  if (!io) {
    throw new Error(
      "Socket.io has not been initialized."
    );
  }

  return io;
}

module.exports = {
  initSocket,
  getIO,
};