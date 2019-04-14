import express from 'express';
import UserController from '../controllers/userController';
import AcctController from '../controllers/acctController';
import Verification from '../middlewares/verification';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to version 1 of banka API' });
});

router.post('/auth/signup', UserController.signup);
router.post('/auth/signin', UserController.signin);
router.post('/accounts', Verification.user, AcctController.createAccount);
router.patch('/accounts/:accountNumber', Verification.admin, AcctController.accountStatus);

export default router;
