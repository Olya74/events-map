import express from 'express';

import {
  registration,
  login
  
} from '../controller/userController.js';
const authRouter = express.Router();


authRouter.route("/register").post(registration);

authRouter.route("/login").post(login);
authRouter.route("/").get((req, res) => {
  res.json({ message: "you are authenticated!" });
});
authRouter.route("/logout").post((req, res) => {
  // Perform logout logic here (e.g., invalidate session)
  res.status(200).json({ message: "User logged out successfully" });
});
authRouter.route("/forgot-password").post((req, res) => {
  const { email } = req.body;
  // Perform password reset logic here (e.g., send reset link)
  res.status(200).json({ message: "Password reset link sent to email", email });
});
authRouter.route("/reset-password").post((req, res) => {
  const { token, newPassword } = req.body;
  // Perform password reset logic here (e.g., update password in database)
  res.status(200).json({ message: "Password reset successfully" });
});
authRouter.route("/change-password").post((req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Perform password change logic here (e.g., update password in database)
  res.status(200).json({ message: "Password changed successfully" });
});

export default authRouter;