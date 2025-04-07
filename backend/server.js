import express from "express";
import http from "http";
import { Server } from "socket.io";
import ChatMessage from "./models/ChatMessage.js";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";
import  "./utils/connect.js";
import cookiParser from "cookie-parser";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookiParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`Client ${socket.id} left room: ${room}`);
  });

  socket.on("sendMessage", async ({ eventId, userId, text }) => {
    const message = new ChatMessage({ eventId, userId, text });
    await message.save();

    io.to(eventId).emit("newMessage", message);
  });
  socket.on("joinRoom", (eventId) => {
    socket.join(eventId);
    console.log(`Client ${socket.id} joined room: ${eventId}`);
  });
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
app.use("/api", router);


 app.use((err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    return res.status(status).json({
      error: {
        message: err.message,
        status,
      },
    });
  }
);
app.use((req, res) => {
    res.status(404).json({ message: "Page not found" });
  }
);
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  
  
