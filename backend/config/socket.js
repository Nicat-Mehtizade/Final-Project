const { Server } = require("socket.io");

function initSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "https://final-project-five-olive.vercel.app", 
      methods: ["GET", "POST"],
      credentials: true, 
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat-message", (data) => {
      io.emit("chat-message", data);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
}

module.exports = { initSocket };
