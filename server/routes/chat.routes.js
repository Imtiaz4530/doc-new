import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { createChat, getMessages } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/", protectRoute, createChat);
router.get("/:chatId/messages", protectRoute, getMessages);

export default router;
