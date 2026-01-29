import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId, res) => {
  // create a token
  const token = jwt.sign({ id: userId }, ENV.JWT_SECRET, {
    expiresIn: "8d",
  });

  // set cookie
  res.cookie("jwt", token, {
    maxage: 8 * 24 * 60 * 60 * 1000, // 8 days
    httpOnly: true,
    sameSite: "strict",
    secure: ENV.NODE_ENV === "development" ? false : true,
  });
  return token;
};