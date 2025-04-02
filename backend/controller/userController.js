import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const registration = async (req, res) => {
 try{
const {name,email,password} = req.body;
const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(400).json({message:"user already exists"});
}
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
const newUser=new User({
    name,
    email,
    password:hashedPassword
});
const savedUser=await newUser.save();
// const token=jwt.sign({id:savedUser._id},process.env.JWT_SECRET,{expiresIn:"1h"});
// res.status(201).json({
//     user:{
//         id:savedUser._id,
//         name:savedUser.name,
//         email:savedUser.email
//     },
//     token
// });
res.status(201).json({message:"User registered successfully", user: savedUser});
 }catch (error) {
   res.status(500).json({ message: error.message });
 }
}
const login = async (req, res) => {
 try{
const {email,password}=req.body;
const user = await User.findOne({ email });
if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
}
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
}
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
res.status(200).json({
    user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
    },
    token
});
 }catch (error) {
   res.status(500).json({ message: error.message });
 }
}
const logout = async (req, res) => {
  // Perform logout logic here (e.g., invalidate session)
  res.status(200).json({ message: 'User logged out successfully' });
}
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // Perform password reset logic here (e.g., send reset link)
  res.status(200).json({ message: 'Password reset link sent to email', email });
}
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  // Perform password reset logic here (e.g., update password in database)
  res.status(200).json({ message: 'Password reset successfully' });
}
const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Perform password change logic here (e.g., update password in database)
  res.status(200).json({ message: 'Password changed successfully' });
}
const auth = async (req, res) => {
  res.json({ message: "you are authenticated" });
}
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
    registration,
  login,
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  updateUserPartById,
  deleteUsers
}