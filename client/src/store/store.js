import { createStore } from "easy-peasy";

import userModel from "./models/userModel";
import chatModel from "./models/chatModel";

const store = createStore({
  user: userModel,
  chat: chatModel,
});

export default store;
