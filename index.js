const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});
const ROOM_id=uuidv4();

io.on("connection", socket => {
  socket.on("join-room", () => {
    socket.join(ROOM_id);
    socket.on("message", (message) => {
      socket.broadcast.to(ROOM_id).emit("send-message", message);
    });
    socket.on("clear-content", () => {
      socket.broadcast.to(ROOM_id).emit("clear");
    });
  });
})

server.listen(5000);
