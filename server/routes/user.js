import express from "express";
import {getUser, getPosts, getRandomUsers} from "../controllers/user.js";

const router = express.Router();
router.get("/random", getRandomUsers);
router.get("/:username", getUser);
router.get("/:username/posts", getPosts);

export default router;