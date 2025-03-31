import User from "../models/User.js";


const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const addUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
const deleteUsers = async (req, res) => {
  try {
    const deletedUser = await User.deleteMany();
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const updateUserById = async (req, res) => {
}
const updateUserPartById = async (req, res) => {
}

export {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  updateUserPartById,
  deleteUsers
}