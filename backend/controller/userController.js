import User from "../models/User.js";
import jwt from "jsonwebtoken";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config.js";

const JWT_SECRET = process.env.JWT_SECRET;
const HCAPTCHA_SECRET = process.env.HCAPTCHA_SECRET;
const SALT_ROUNDS = process.env.SALT_ROUNDS;
const opt={runValidators:true,new:true};
const registration = async (req, res) => {
  const { name, email, password, captcha } = req.body;
  if (!name || !email || !password || !captcha) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
const existingUser=await User.findOne({email:email});
if(existingUser){
    return res.status(400).json({message:"user already exists"});
}
const response=await fetch('https://hcaptcha.com/siteverify',
{
    method:'POST',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded'
    },
    body:`response=${captcha}&secret=${HCAPTCHA_SECRET}`
});

const data = await response.json();
if(!data.success){return res.status(400).json({error:"Captcha verification failed"});}
const sanitizedName=validator.escape(name);
const sanitizedEmail=validator.escape(email);
if (!validator.isEmail(sanitizedEmail)) {return res.status(400).json({ error: "Invalid email format" });}
if (!validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1 , minSymbols: 1 })) {
    return res.status(400).json({ error: "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character." });
}

const hashedPW=await bcrypt.hash(password,Number(SALT_ROUNDS));

try {
  await User.create({name:sanitizedName,email:sanitizedEmail,password:hashedPW});
return res.status(201).json({ message: "User registered successfully" });
} catch (error) {
  res.status(500).json({ error: error.message });
}
}

const login = async (req, res) => {
  const { email, password} = req.body;
 try{
    const sanitizedPassword = validator.escape(password);
    const user = await User.findOne({email: email});
    if(!user) return res.status(400).json({error: 'Invalid credentials'});
    const valid = await bcrypt.compare(sanitizedPassword, user.password);
    if(!valid) return res.status(400).json({error: "Invalid credentials"})
    const token = jwt.sign({id: user._id,name:user.name, email: user.email}, JWT_SECRET, {expiresIn: '30d'});
   console.log("token", token);
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 2592000000 
    }).json({message: "Logged In"});
    
 }catch (error) {
   res.status(500).json({ error: error.message });
 }
}
const authMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not authorized" });
  try {
    const decode = jwt.verify(token, JWT_SECRET);
    res.json({id:decode.id,name:decode.name, email: decode.email });
  } catch (e) {
    res.status(401).json({ e: "User not found or token invalid" });
  }
};
const logout = async (req, res) => {
 res.clearCookie('token').json({message: "Logged out successfully"});
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

const getUsers = async (req, res,next) => {
  try {
    
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
    // res.status(500).json({ message: error.message });
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
  const { id } = req.params;
  try{
const updateUser=await User.replaceOne({_id:id},req.body,opt);
if(!updateUser){
    return res.status(404).json({message:"User not found"});
}
    res.status(200).json(updateUser);
  }catch (error) {
    res.status(500).json({ message: error.message });
  }
}
const updateUserPartById = async (req, res) => {
  const { id } = req.params;
  try{ 
    const updateUser=await User.findByIdAndUpdate(id,req.body,opt);

    if(!updateUser){
        return res.status(404).json({message:"User not found"});
    }
     res.json(updateUser);
  }catch(error) {
    res.status(500).json({error: error.message });
  }
}
const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
export {
  registration,
  login,
  logout,
   authMe,
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  updateUserPartById,
  deleteUsers
}