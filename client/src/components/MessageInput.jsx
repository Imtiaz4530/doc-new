/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import PropTypes from "prop-types";
import ChatService from "../utils/ChatService";

const MessageInput = ({ chatId, senderId }) => {
  const [message, setMessage] = useState("");

  const handleSend = async () => {
    if (message.trim()) {
      try {
        await ChatService.sendMessage(chatId, senderId, message);
        setMessage("");
      } catch (error) {
        console.error("Failed to send message:", error);
      }
    }
  };

  return (
    <Box display="flex" alignItems="center" mt={2}>
      <TextField
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        variant="outlined"
        sx={{ mr: 2 }}
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </Box>
  );
};

MessageInput.propTypes = {
  chatId: PropTypes.string.isRequired,
  senderId: PropTypes.string.isRequired,
};

export default MessageInput;
