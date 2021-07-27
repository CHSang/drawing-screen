const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
  }
});

app.use("/rooms", require("./api/RoomApi"));

const histories = new Map();

io.on("connection", socket => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    if (histories && histories.get(roomId)) {
      socket.emit("history", histories.get(roomId));
    }

    socket.on("message", (message) => {
      if (histories.get(roomId)) {
        histories.get(roomId).push(message);
      } else {
        histories.set(roomId, [message])
      }
      socket.broadcast.to(roomId).emit("send-message", message);
    });

    socket.on("clear-context", () => {
      histories.set(roomId, [])
      socket.broadcast.to(roomId).emit("clear-content");
    });
    
    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    })
  });
})

server.listen(5000);
