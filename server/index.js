import express from "express";
const app = express();

import authRoutes from "./routes/auth.js";

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8500, () => {
    console.log("Server is running on port 8500");
});