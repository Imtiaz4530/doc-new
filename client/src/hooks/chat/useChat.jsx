import { useCallback } from "react";
import ChatService from "../../utils/ChatService";

const useChat = (chatId) => {
  const connectToChat = useCallback((chatId, addMessage) => {
    ChatService.connect(chatId);
    ChatService.onMessage((message) => {
      addMessage(message);
    });
  }, []);

  const sendMessage = (content) => {
    // Assuming you have userId available
    const senderId = "user-id"; // Replace with actual user ID
    ChatService.sendMessage(chatId, senderId, content);
  };

  return {
    connectToChat,
    sendMessage,
  };
};

export default useChat;
