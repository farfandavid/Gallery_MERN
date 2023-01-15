import User from "../models/User.js";
import { hashPassword } from "./auth.controllers.js"

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Si req file existe e image existe
    //let newPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: await hashPassword(password)
    });
    //console.log(newPost);
    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}