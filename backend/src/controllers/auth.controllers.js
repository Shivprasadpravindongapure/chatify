// backend/src/controllers/auth.controllers.js

import User from "../models/user.js"; // Make sure this matches your actual filename
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    // 1️⃣ Validate input
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create new user
    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Save user
    const savedUser = await user.save();

    // 6️⃣ Generate JWT and set cookie
    generateToken(savedUser._id, res);

    // 7️⃣ Respond to frontend
    res.status(201).json({
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      profilePic: savedUser.profilePic,
    });

    // 8️⃣ Send welcome email (optional)
    try {
      await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }

  } catch (error) {
    console.error("Error in signup controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
