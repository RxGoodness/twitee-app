import express from 'express';
import { createUser, getAllUsers,updateUser, deleteUser, login, logout, confirmEmail } from '../controllers/controller';
// import { createTweet, getAllTweets, updateTweet, deleteTweet, addLike, addComment } from '../controllers/controller';

const router = express.Router();
router.post('/login', login);
router.post('/logout', logout);
router.post('/users', createUser);
router.get('/users/verify/:token', confirmEmail);
router.get('/users', getAllUsers);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
