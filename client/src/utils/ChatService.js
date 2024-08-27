import io from "socket.io-client";
import axiosInstance from "../api/axiosInstance";

const socket = io("http://localhost:4000");

const ChatService = {
  createChat: async (userId, doctorId) => {
    try {
      const response = await axiosInstance.post("/api/chats", {
        userId,
        doctorId,
      });
      return response.data;
    } catch (error) {
      console.error("Error creating chat:", error.message);
      throw error;
    }
  },

  // API for fetching messages
  getMessages: async (chatId) => {
    try {
      const response = await axiosInstance.get(`/api/chats/${chatId}/messages`);
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      throw error;
    }
  },

  // Send message via WebSocket, including senderId as required by the backend
  sendMessage: (chatId, senderId, content) => {
    socket.emit("sendMessage", { chatId, senderId, content });
  },

  // Receive message via WebSocket
  onMessageReceived: (callback) => {
    socket.on("receiveMessage", callback);
  },

  // Join a chat room
  joinChat: (chatId) => {
    socket.emit("joinChat", { chatId });
  },

  // Disconnect WebSocket
  disconnect: () => {
    socket.disconnect();
  },
};

export default ChatService;
