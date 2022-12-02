import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import multer from "multer";
import { Server } from "socket.io";

const app = express();
const io = new Server({
    cors: {
        origin: "http://localhost:3000",
    }
});

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

app.listen(8500, () => {
    console.log("Server is running on port 8500");
});

let users = [];
const addNewUser = (id, socketId) => {
    !users.some((user) => user.id === id) &&
    users.push({ id, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

io.on("connection", (socket) => {
    socket.on("addUser", (id) => addNewUser(id, socket.id));
    socket.on("disconnect", () => removeUser(socket.id));

    socket.on("updateUser", (id) => {
        socket.to(getUser(id).socketId).emit("updateUser");
    })
});

io.listen(8501, () => {
    console.log("Socket is running on port 8501");
})