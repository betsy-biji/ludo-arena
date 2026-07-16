import { io } from "socket.io-client";

const socket = io("https://ludo-arena-production-aa34.up.railway.app", {
  autoConnect: false,
  transports: ["websocket"],
});

export default socket;