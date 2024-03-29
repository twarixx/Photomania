import {db} from "../database.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const blacklistedNames = [
    "post",
    "posts",
    "webmaster",
    "admin",
    "login",
    "register",
    "logout"
]

export const register = (req, res) => {
    const query = "SELECT * FROM social_users WHERE username = ? OR email = ?";
    const {password, email, username} = req.body;

    db.query(query, [username, email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length) return res.status(400).json("Username or email already exists.");

        const {username, email, password, con_password} = req.body;
        if (password !== con_password) return res.status(400).json("Passwords do not match.");

        if (blacklistedNames.includes(username.toLowerCase())) return res.status(400).json("Username is not allowed.");

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const query = "INSERT INTO social_users (`username`, `display_name`, `email`, `password`, `last_updated`) VALUES (?)";

        const values = [
            username,
            username,
            email,
            hashedPassword,
            Date.now()
        ];

        db.query(query, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return login(req, res);
        });
    });
};

export const login = (req, res) => {
    const {username} = req.body;

    const isEmail = username.includes("@");
    const query = isEmail ? "SELECT * FROM social_users WHERE email = ?" : "SELECT * FROM social_users WHERE username = ?";

    db.query(query, [username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (!data.length) return res.status(400).json("Username or password is incorrect.");

        const user = data[0];
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) return res.status(400).json("Username or password is incorrect.");
        if (user.suspended === 1) return res.status(400).json("Your account has been suspended.");

        const token = jwt.sign({ id: user.id }, 'shhhhh');
        res.cookie("accessToken", token, { httpOnly: true });

        const {password, ...userWithoutPassword} = user;
        return res.status(200).json(userWithoutPassword);
    });
};

export const logout = (req, res) => {
    res.clearCookie("accessToken", { secure: true, sameSite: "none" }).status(200).json("Logged out.");
};