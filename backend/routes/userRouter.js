import express from 'express';

import {
  registration,
  login,
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUsers
} from '../controller/userController.js';
const userRouter = express.Router();


userRouter.route('/register').post(registration);

userRouter.route('/login').post(login);
userRouter.route("/auth").get((req, res) => {
  res.json({ message: "you are authenticated" });
});
userRouter.route('/logout').post((req, res) => {
  // Perform logout logic here (e.g., invalidate session)
  res.status(200).json({ message: 'User logged out successfully' });
}
);
userRouter.route('/forgot-password').post((req, res) => {
  const { email } = req.body;
  // Perform password reset logic here (e.g., send reset link)
  res.status(200).json({ message: 'Password reset link sent to email', email });
}
);
userRouter.route('/reset-password').post((req, res) => {
  const { token, newPassword } = req.body;
  // Perform password reset logic here (e.g., update password in database)
  res.status(200).json({ message: 'Password reset successfully' });
}
);
userRouter.route('/change-password').post((req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Perform password change logic here (e.g., update password in database)
  res.status(200).json({ message: 'Password changed successfully' });
}
);

userRouter.route('/users').get(getUsers).post(addUser).delete(deleteUsers);
userRouter.route('/users/:id').get(getUserById).put(updateUserById);

export default userRouter;