import {db} from "../database.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT * FROM social_users WHERE username = ? OR display_name LIKE ?";
        const {username} = req.params;

        db.query(query, [username, username], (err, data) => {
            if (err) return res.status(500).json(err);
            if (!data.length) return res.status(400).json("User not found.");

            const {password, ...user} = data[0];

            return res.status(200).json(user);
        });
    });
}

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT p.*, u.id as userId FROM social_posts AS p JOIN social_users AS u ON p.posterId = u.id WHERE u.username = ? ORDER BY p.timestamp DESC";
        const {username} = req.params;

        db.query(query, [username], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    });
}