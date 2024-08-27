import User from "../models/user.model.js";
import Doctor from "../models/doctor.model.js";
import Chat from "../models/chat.model.js";

export const createChat = async (req, res) => {
  try {
    const { userId, doctorId } = req.body;

    // Ensure userId and doctorId are different and valid
    if (userId === doctorId) {
      return res
        .status(400)
        .json({ message: "Chat must be between different users." });
    }

    const user = await User.findById(userId);
    const findDoctor = await Doctor.findById(doctorId);
    const doctor = await User.findOne({ email: findDoctor.email });

    if (!user || !doctor || user.role === doctor.role) {
      return res.status(400).json({ message: "Invalid chat participants." });
    }

    let chat = await Chat.findOne({ userId, doctorId });

    if (!chat) {
      chat = new Chat({ userId, doctorId, messages: [] });
      await chat.save();
    }

    res.status(200).json(chat);
  } catch (error) {
    console.error("Error In Create Chat Controller ---> ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const chat = await Chat.findById(chatId).populate(
      "messages.sender",
      "name"
    );

    if (!chat) {
      return res.status(404).json({ message: "Chat not found." });
    }

    res.status(200).json(chat.messages);
  } catch (error) {
    console.error("Error In Get Message Controller ---> ", error.message);
    res.status(500).json({ error: "Internal server error!" });
  }
};
