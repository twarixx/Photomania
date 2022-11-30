import {db} from "../database.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT * FROM social_users WHERE LOWER(username) = ? OR LOWER(display_name) LIKE ?";
        const {username} = req.params;

        db.query(query, [username.toLowerCase(), username.toLowerCase()], (err, data) => {
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

export const getFollowers = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT r.* from social_relationships as r JOIN social_users as u ON r.followed_user_id = u.id WHERE u.username = ?";
        const {username} = req.params;

        db.query(query, [username], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data.map(follower => follower.follower_user_id));
        });
    });
}

export const getFollowed = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT r.* from social_relationships as r JOIN social_users as u ON r.follower_user_id = u.id WHERE u.username = ?";
        const {username} = req.params;

        db.query(query, [username], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data.map(follower => follower.follower_user_id));
        });
    });
}

export const addFollower = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "INSERT INTO social_relationships (`followed_user_id`, `follower_user_id`) VALUES (?)";
        const {userId} = req.params;

        const values = [
            userId,
            userInfo.id
        ]

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).send("Follower added.");
        });
    });
}

export const deleteFollower = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "DELETE FROM social_relationships WHERE followed_user_id = ? AND follower_user_id = ?";
        const {userId} = req.params;

        db.query(query, [userId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).send("Follower removed.");
        });
    });
}

export const getRandomUsers = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT * FROM social_users ORDER BY RAND() LIMIT 0,10;";
        db.query(query, (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    });

}