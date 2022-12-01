import express from "express";
import {addPost, getPosts, getPost, getAllPosts, deletePost, updatePost} from "../controllers/posts.js";

const router = express.Router();
router.get("/", getPosts);
router.get("/all", getAllPosts);
router.get("/:uniqueId", getPost);
router.post("/", addPost);
router.delete("/:uniqueId/:location", deletePost);
router.put("/update", updatePost);

export default router;