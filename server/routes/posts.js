import express from "express";
import {addPost, getPosts, getPost, getAllPosts} from "../controllers/posts.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/all", getAllPosts);
router.get("/:uniqueId", getPost);
router.post("/", addPost);

export default router;