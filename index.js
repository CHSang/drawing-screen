const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

let history=[];
const ROOM_id=uuidv4();
io.on("connection", socket => {
  socket.on("join-room", (userId) => {
    socket.join(ROOM_id);
    socket.broadcast.to(ROOM_id).emit("user-connected", userId);
    if (history && history.length > 0) {
      socket.emit("history", history);
      console.log("send history");
    }
    socket.on("message", (message) => {
      history.push(message);
      socket.broadcast.to(ROOM_id).emit("send-message", message);
    });
    socket.on("clear-context", () => {
      console.log("cealr on server");
      socket.broadcast.to(ROOM_id).emit("clear-content");
    });
  });
})

server.listen(5000);
