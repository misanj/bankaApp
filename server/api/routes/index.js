/* eslint-disable max-len */
/* eslint-disable import/named */
import express from 'express';
import UserController from '../controllers/userController';
import AcctController from '../controllers/acctController';
import Verification from '../middlewares/verification';
import { validateUser, signInuser } from '../middlewares/validation';
import validateCreate from '../middlewares/acctvalidate';
// import TransactionController from '../controllers/transactionCont';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to version 1 of banka API' });
});

router.post('/auth/signup', validateUser, UserController.signUp);
router.post('/auth/signin', signInuser, UserController.signIn);
router.post('/accounts', validateCreate, Verification.user, AcctController.createAccount);

// router.patch('/accounts/:accountNumber', Verification.admin, AcctController.accountStatus);
// router.delete('/accounts/:accountNumber', Verification.admin, AcctController.deleteAccount);
// router.post('/transactions/:accountNumber/credit', Verification.staff, TransactionController.creditAccount);
// router.post('/transactions/:accountNumber/debit', Verification.staff, TransactionController.debitAccount);
export default router;
