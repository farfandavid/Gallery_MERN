import User from "../models/User.js";

export const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Si req file existe e image existe

    const newUser = new User({ username, email, password });
    //console.log(newPost);
    await newUser.save();
    return res.json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}