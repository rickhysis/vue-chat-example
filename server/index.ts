import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

interface ServerToClientEvents {
  noArg: () => void;
  basicId: (a: string) => void;
}

interface ClientToServerEvents {
  message: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface Message {
  userId: string 
  userName: string 
  message: string
}

const app = express();
const httpServer = createServer(app);
const port = process.env.PORT || 8080;
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents
>( httpServer, {
  cors: {
    origin: "*"
  }
});


io.on("connection", (socket: any) => {

  console.log(socket.id); // ojIckSD2jqNzOqIrAGzL
  socket.emit("noArg");
  socket.emit("basicId", socket.id);

  socket.on("message", (m: Message) => {
    console.log("[server](message): %s", JSON.stringify(m));
    socket.broadcast.emit("message", m);
  });

  socket.on("typing", (id: string) => {
    socket.broadcast.emit("typing", id);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    for (const room of socket.rooms) {
      if (room !== socket.id) {
        socket.to(room).emit("user has left", socket.id);
      }
    }
  });
});

httpServer.listen(port, () => {
  console.log('Server listening at port %d', port);
});
