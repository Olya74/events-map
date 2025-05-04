import express from 'express';

import {
  registration,
  login,
  logout,
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  updateUserPartById,
  deleteUsers,
  authMe
} from '../controller/userController.js';
const userRouter = express.Router();


userRouter.route('/register').post(registration);
userRouter.route('/login').post(login);
userRouter.route("/me").get(authMe);
userRouter.route('/logout').post(logout);
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
userRouter
  .route("/users/:id")
  .get(getUserById)
  .put(updateUserById)
  .patch(updateUserPartById);

export default userRouter;