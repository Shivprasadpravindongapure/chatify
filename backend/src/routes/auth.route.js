import express from "express";
import { signup, login, logout,updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";  


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-profile", updateProfile);

router.get("/check", protectRoute, (req, res) => res.status(200).json(req.User));


export default router;