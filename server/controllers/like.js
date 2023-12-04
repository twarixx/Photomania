import {db} from "../database.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT user_id FROM social_posts_likes WHERE post_id = ?";
        const {postId} = req.query;

        db.query(query, [postId], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data.map(like => like.user_id));
        });
    });
}

export const addLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "INSERT INTO social_posts_likes (`post_id`, `user_id`) VALUES (?)";
        const {postId} = req.query;

        const values = [
            postId,
            userInfo.id
        ]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).send("Like added.");
        });
    });
}

export const deleteLike = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "DELETE FROM social_posts_likes WHERE post_id = ? AND user_id = ?";
        const {postId} = req.query;

        db.query(query, [postId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).send("Like removed.");
        });
    });
}