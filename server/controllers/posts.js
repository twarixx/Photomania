import {db} from "../database.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT p.*, u.id as userId, u.username, u.display_name, u.profile_picture FROM social_posts AS p JOIN social_users AS u ON p.posterId = u.id LEFT JOIN social_relationships AS sr on (p.posterId = sr.followed_user_id) WHERE sr.follower_user_id = ? OR p.posterId = ? ORDER BY p.timestamp DESC";

        db.query(query, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    });
};