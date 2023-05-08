import express from "express";
import {
  getUser,
  getUserFriends,
  addRemovefriend,
} from "../Controllers/users.js";
import { verifyToken } from "../Controllers/middleware/auth.js";

const router = express.Router();

//-----------------READ---------------------

router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//----------------UPDATE------------------
router.patch(":/id/:friendId", verifyToken, addRemovefriend);
export default router;
