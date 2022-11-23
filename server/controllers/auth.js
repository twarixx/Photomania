import {db} from "../database.js";
import bcrypt from "bcrypt";

export const register = (req, res) => {
    const query = "SELECT * FROM users WHERE username = ? OR email = ?";
    const {password, email, username} = req.body;

    db.query(query, [username, email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(400).json("Username or email already exists.");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const query = "INSERT INTO users (`username`, `display_name`, `email`, `password`) VALUES (?, ?, ?, ?)";
        const {username, display_name, email} = req.body;

        const values = [
            username,
            display_name,
            email,
            hashedPassword
        ];

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Successfully registered.");
        });
    });
}

