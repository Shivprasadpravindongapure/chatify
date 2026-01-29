import express from "express";
import dotenv from "dotenv";
import path from "path";
import { ENV } from "./lib/env.js"; 

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";

connectDB();

const app = express();

const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// production
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
