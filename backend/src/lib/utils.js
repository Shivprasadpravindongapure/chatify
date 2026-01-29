import jwt from "jsonwebtoken";

export const generateToken = (userId, res) => {
  const {JWT_SECRET,NODE_ENV } = process.env;
  // create a token
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "8d",
  });

  // set cookie
  res.cookie("jwt", token, {
    maxage: 8 * 24 * 60 * 60 * 1000, // 8 days
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "development" ? false : true,
  });
  return token;
};