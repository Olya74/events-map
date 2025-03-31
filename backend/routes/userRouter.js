import {Router} from 'express';
import {
  getUsers,
  getUserById,
  addUser,
  updateUserById,
  deleteUsers
} from '../controller/userController.js';
const router = Router();



router.route('/users').get(getUsers).post(addUser).delete(deleteUsers);
router.route('/users/:id').get(getUserById).put(updateUserById);

export default router;