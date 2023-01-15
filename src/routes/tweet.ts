import express from 'express';
// import { createUser, updateUser, deleteUser } from '../controllers/controller';
import { createTweet, getAllTweets, updateTweet, deleteTweet, addLike, addComment } from '../controllers/controller';

const router = express.Router();

// router.post('/users', createUser);
// // router.get('/users', getAllUsers);
// router.put('/users/:id', updateUser);
// router.delete('/users/:id', deleteUser);

router.post('/tweets', createTweet);
router.get('/tweets', getAllTweets);
router.put('/tweets/:id', updateTweet);
router.delete('/tweets/:id', deleteTweet);
router.post('/tweets/:id/likes', addLike);
router.post('/tweets/:id/comments', addComment);

export default router;
