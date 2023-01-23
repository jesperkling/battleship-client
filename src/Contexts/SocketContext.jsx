import React, { createContext, useContext } from "react";
import socketio from "socket.io-client";

const SocketContext = createContext();

const socket = socketio.connect(process.env.REACT_APP_SERVER_URL);
console.log(socket);

export const useSocketContext = () => {
  return useContext(SocketContext);
};

const SocketContextProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
