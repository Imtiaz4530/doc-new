import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";
import {
  validateLogin,
  validateRegister,
} from "../Validation/authValidation.js";

const router = express.Router();

router.post("/register", validateRegister, registerController);
router.post("/login", validateLogin, loginController);

export default router;
