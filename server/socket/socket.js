import { Server } from "socket.io";
import http from "http";
import express from "express";

import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinChat", async ({ chatId }) => {
    socket.join(chatId);
  });

  socket.on("sendMessage", async ({ chatId, senderId, content }) => {
    console.log(chatId, senderId, content);

    try {
      const chat = await Chat.findById(chatId);
      const sender = await User.findById(senderId);

      if (chat && sender) {
        // Ensure the sender is part of the chat
        if (chat.userId.equals(senderId) || chat.doctorId.equals(senderId)) {
          const message = { sender: senderId, content };
          chat.messages.push(message);
          await chat.save();

          io.to(chatId).emit("receiveMessage", message);
        } else {
          console.log("Unauthorized access to chat.");
        }
      } else {
        console.log("Chat or sender not found.");
      }
    } catch (error) {
      console.error("Error sending message:", error.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

export { app, io, server };
