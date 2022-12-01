import express from "express";
import {getNotifications, deleteNotifications} from "../controllers/notifications.js";

const router = express.Router();
router.get("/", getNotifications);
router.delete("/", deleteNotifications);

export default router;