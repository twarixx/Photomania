import express from "express";
import {addPost, getPosts, getPost} from "../controllers/posts.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/:uniqueId", getPost);
router.post("/add", addPost);

export default router;