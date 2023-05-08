import express from "express";
import { login } from "../Controllers/Auth.js";

const router = express.Router();
router.post("/login", login);

export default router;
