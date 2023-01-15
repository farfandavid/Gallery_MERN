import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../models/User.js"

const SECRET = "mysecretkey";

export const createToken = async (user) => {
  return jwt.sign(user, SECRET, { expiresIn: "1h" });
};

export const verifyToken = async (token) => {
  return jwt.verify(token, SECRET);
};

export const hashPassword = async (password) => {
  return bcrypt.hashSync(password, 10);
};

export const comparePasswords = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};


