import express from 'express';
import UserController from '../controllers/userController';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to version 1 of banka API' });
});

router.post('/auth/signup', UserController.signup);
router.post('/auth/signin', UserController.signin);

export default router;
