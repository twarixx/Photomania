import express from "express";
import {
    getUser,
    getPosts,
    getRandomUsers,
    getFollowers,
    getFollowed,
    addFollower,
    deleteFollower,
    updateUser,
    forceUpdateUser,
    getAllUsers,
    deleteUser
} from "../controllers/user.js";

const router = express.Router();
router.get("/random", getRandomUsers);
router.get("/all", getAllUsers)
router.get("/:username", getUser);
router.put("/update", updateUser);
router.put("/admin/update", forceUpdateUser)
router.get("/:username/posts", getPosts);
router.get("/:username/followers", getFollowers);
router.get("/:username/followed", getFollowed);
router.post("/:userId/followers", addFollower);
router.delete("/:userId/followers", deleteFollower);
router.delete("/:username", deleteUser);

export default router;