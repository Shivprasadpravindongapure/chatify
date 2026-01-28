import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import Path from "path";

const app = express();


const __dirname = Path.resolve();
const port = process.env.PORT || 3000;

console.log((process.env.PORT));
dotenv.config();
app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);
app.listen(port, () => console.log("server is running on port" + port));
