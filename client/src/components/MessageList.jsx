import { useState, useEffect } from "react";
import ChatService from "../utils/ChatService";
import { useStoreState } from "easy-peasy";
import MessageItem from "./MessageItem";

const MessageList = () => {
  const { chatId } = useStoreState((state) => state.chat);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        // Fetch initial messages
        const data = await ChatService.getMessages(chatId);
        setMessages(data);
      } catch (error) {
        console.error("Failed to fetch messages:", error.message);
      }
    };

    if (chatId) {
      fetchMessages();
      ChatService.joinChat(chatId); // Join chat room

      // Listen for new messages
      ChatService.onMessageReceived((message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    // Cleanup WebSocket connection when the component unmounts
    // return () => {
    //   ChatService.disconnect();
    // };
  }, [chatId]);
  console.log(messages);
  return (
    <div className="message-list">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} />
      ))}
    </div>
  );
};

export default MessageList;
