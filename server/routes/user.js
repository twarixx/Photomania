import express from "express";
import {getUser, getPosts} from "../controllers/user.js";

const router = express.Router();
router.get("/:username", getUser);
router.get("/:username/posts", getPosts);

export default router;