import { createContext, useContext, useEffect, useState } from "react";
import socket from "../services/socket";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [connected, setConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setConnected(true);
      console.log("🟢 Socket Connected");
    }

    function onDisconnect() {
      setConnected(false);
      console.log("🔴 Socket Disconnected");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}