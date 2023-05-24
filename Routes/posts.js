import express from "express"
import { getFeedPosts, getUserPosts, likePost } from "../Controllers/posts.js";
import { verifyToken } from "../Controllers/middleware/auth.js";

const router = express.Router();

//---------------------READ------------------------------
router.get("/", getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

//-----------------------UPDATE---------------------------

router.patch("/like/:id", likePost);
export default router;
