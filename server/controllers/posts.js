import {db} from "../database.js";
import jwt from "jsonwebtoken";
import uniqueGen from "short-uuid"
import fs from "fs";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT DISTINCT p.*, u.id as userId, u.username, u.display_name, u.profile_picture, u.verified " +
            "FROM social_posts AS p JOIN social_users AS u ON p.posterId = u.id AND u.suspended = 0 " +
            "LEFT JOIN social_relationships AS sr on (p.posterId = sr.followed_user_id) " +
            "WHERE sr.follower_user_id = ? OR p.posterId = ? " +
            "ORDER BY p.timestamp DESC " +
            "LIMIT ? OFFSET ?";

        const cursor = parseInt(req.query.cursor) || 0;
        const limit = 3;

        db.query(query, [userInfo.id, userInfo.id, limit, cursor], (err, data) => {
            if (err) return res.status(500).json(err);

            const nextId = data.length < limit ? null : cursor + limit;

            return res.status(200).json({
                nextId,
                data: data
            });
        });
    });
};

export const getAllPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT DISTINCT p.*, u.id as userId, u.username, u.display_name, u.profile_picture, u.verified " +
            "FROM social_posts AS p JOIN social_users AS u ON p.posterId = u.id " +
            "ORDER BY p.timestamp DESC ";

        db.query(query, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json({
                data
            });
        });
    });
};

export const getPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");
        const {uniqueId} = req.params;

        const query = "SELECT p.*, u.id as userId, u.username, u.display_name, u.profile_picture, u.verified " +
            "FROM social_posts AS p JOIN social_users AS u ON p.posterId = u.id WHERE unique_id = ?";

        db.query(query, [uniqueId], (err, data) => {
            if (err) return res.status(500).json(err);
            if (!data.length) return res.status(400).json("No post could be found.");

            return res.status(200).json(data[0]);
        });
    });
};

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const postId = uniqueGen.generate();
        const {caption, source} = req.body;

        const query = "INSERT INTO social_posts (`unique_id`, `posterId`, `caption`, `source`, `timestamp`) VALUES (?)";
        const values = [postId, userInfo.id, caption, '/images/uploads/' + source, Date.now() / 1000];

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Post added.");
        });
    });
};

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");
        const {uniqueId, location} = req.params;

        const query = "DELETE FROM social_posts WHERE unique_id = ?";

        try {
            fs.unlinkSync("../client/public" + location.replaceAll(":", "/"));

            db.query(query, [uniqueId], (err, data) => {
                if (err) return res.status(500).json(err);

                return res.status(200).json("Post removed.");
            });
        } catch (err) {
            console.error(err);
        }
    });
}

export const updatePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(403).json("You are not logged in.");

        const query = "UPDATE social_posts SET `caption`=?, `source`=? WHERE id=?";
        const values = [
            req.body.caption,
            req.body.source.startsWith('/images') ? req.body.source : '/images/uploads/' + req.body.source,
            req.body.id
        ]

        db.query(query, values, (err, data) => {
            if (err) return res.status(500).json(err);

            if (data.affectedRows > 0) return res.json("Updated!");
            return res.status(403).json("Couldn't update!");
        });
    });
};