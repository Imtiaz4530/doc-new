import { useEffect } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import ChatService from "../utils/ChatService";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { useStoreState, useStoreActions } from "easy-peasy";

const ChatPage = () => {
  const { userId, doctorId } = useStoreState(
    (state) => state.chat.chatParticipants
  );
  const setChatId = useStoreActions((actions) => actions.chat.setChatId);
  const chatId = useStoreState((state) => state.chat.chatId);

  useEffect(() => {
    const initiateChat = async () => {
      try {
        if (!chatId) {
          const chat = await ChatService.createChat(userId, doctorId);
          setChatId(chat._id);
        }
      } catch (error) {
        console.error("Error initiating chat:", error.message);
      }
    };

    if (userId && doctorId && !chatId) {
      initiateChat();
    }
  }, [userId, doctorId, chatId, setChatId]);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
        {chatId ? (
          <>
            <MessageList chatId={chatId} />
            <MessageInput chatId={chatId} senderId={userId} />
          </>
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <CircularProgress />
            <Typography variant="h6" sx={{ ml: 2 }}>
              Loading chat...
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ChatPage;
