import {db} from "../database.js";
import jwt from "jsonwebtoken";

export const getNotifications = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "SELECT n.*, ou.display_name, ou.username FROM social_notifications as n JOIN social_users su on (su.id = n.user_id) JOIN social_users ou on (ou.id = n.received_from) WHERE n.user_id = ?";

        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json(data);
        });
    });
}

export const deleteNotifications = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not logged in.");

    jwt.verify(token, 'shhhhh', (err, userInfo) => {
        if (err) return res.status(401).json("You are not logged in.");

        const query = "DELETE FROM social_notifications WHERE user_id = ?";

        db.query(query, [userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);

            return res.status(200).json("Notifications deleted.");
        });
    });
}