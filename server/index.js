import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import notificationRoutes from "./routes/notifications.js";
import multer from "multer";

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Credentials", true);
   next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../client/public/images/uploads");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes)
app.use("/api/likes", likeRoutes)
app.use("/api/notifications", notificationRoutes)

app.listen(8500, () => {
    console.log("Server is running on port 8500");
});