import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

import authRoutes from "./routes/auth.js";

app.use((req, res, next) => {
   res.header("Access-Control-Allow-Credentials", true);
   next();
});
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
}));
app.use(cookieParser())

app.use("/api/auth", authRoutes);

app.listen(8500, () => {
    console.log("Server is running on port 8500");
});