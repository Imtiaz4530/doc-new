import { action } from "easy-peasy";

const chatModel = {
  chatParticipants: {
    userId: null,
    doctorId: null,
  },
  chatId: null,
  setChatParticipants: action((state, payload) => {
    state.chatParticipants = payload;
  }),
  setChatId: action((state, chatId) => {
    state.chatId = chatId;
  }),
};

export default chatModel;
