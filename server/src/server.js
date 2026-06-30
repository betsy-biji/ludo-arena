require("dotenv").config();

const express = require("express");
const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const roomRoutes = require("./routes/roomRoutes");
const gameRoutes = require("./routes/gameRoutes");
const socketHandler = require("./sockets/gameSocket");

const { initSocket } = require("./socket");

const app = express();

/* -------------------- Database -------------------- */

connectDB();

/* -------------------- Middlewares -------------------- */

app.use(cors());

app.use(express.json());

/* -------------------- Routes -------------------- */

app.use("/api/auth", authRoutes);
app.use("/api/room", roomRoutes);
app.use("/api/game", gameRoutes);
/* -------------------- HTTP Server -------------------- */

const server = http.createServer(app);

/* -------------------- Socket.io -------------------- */

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

/* Make io available throughout the backend */

initSocket(io);

/* Register socket events */

socketHandler(io);

/* -------------------- Start Server -------------------- */

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});