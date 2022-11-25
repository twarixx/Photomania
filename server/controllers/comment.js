import {db} from "../database.js";
import jwt from "jsonwebtoken";
import uniqueGen from "short-uuid";

export const getComments = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT c.*, c.id as commentId, u.display_name, u.username, u.profile_picture, u.verified, p.*, p.id as postId FROM social_posts_comments AS c JOIN social_posts as p ON (c.post_id = p.id) JOIN social_users AS u ON (u.id = c.poster_id) WHERE p.unique_id = ? ORDER BY c.posted_on DESC";
        const {post} = req.params;

        db.query(query, [post], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    });
}

export const createComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const {post_id, poster_id, comment} = req.body;

        const query = "INSERT INTO social_posts_comments (`post_id`, `poster_id`, `comment`, `posted_on`) VALUES (?)";
        const values = [post_id, poster_id, comment, Date.now() / 1000];

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Comment added.");
        });
    });
}