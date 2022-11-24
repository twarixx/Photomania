import express from "express";
import {addPost, getPosts} from "../controllers/posts.js";

const router = express.Router();
router.get("/", getPosts);
router.post("/add", addPost);

export default router;