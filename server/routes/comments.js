import express from "express";
import {createComment, getComments,} from "../controllers/comment.js";

const router = express.Router();
router.get("/:post", getComments);
router.post("/", createComment);

export default router;