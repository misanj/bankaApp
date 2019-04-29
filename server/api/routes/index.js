import express from 'express';
import UserController from '../controllers/userController';
import AccountController from '../controllers/acctController';
import Verification from '../middlewares/verification';
import validateUser from '../middlewares/validation';
import validate from '../middlewares/validationResults';
import TransactionController from '../controllers/transactionCont';

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome to version 1 of banka API' });
});

router.post('/auth/signup', validateUser.signUp, validate, UserController.signUp);
router.post('/auth/signin', validateUser.signIn, validate, UserController.signIn);
router.post('/accounts', validateUser.accountCreate, validate, Verification.user,
  AccountController.createAccount);
router.patch('/accounts/:accountNumber', validateUser.accountStatus, validateUser.accountNumber, validate,
  Verification.admin, AccountController.activateDeactivate);
router.delete('/accounts/:accountNumber', validateUser.accountNumber,validate, Verification.admin, AccountController.deleteAccount);
router.post('/transactions/:accountNumber/credit', validateUser.transactionsCre, validateUser.accountNumber,
  validate, Verification.staff, TransactionController.creditAccount);
router.post('/transactions/:accountNumber/debit',  validateUser.transactionsCre, validateUser.accountNumber,
  validate, Verification.staff, TransactionController.debitAccount);
router.get('/accounts/:accountNumber/transactions', validateUser.accountNumber, validate, Verification.user, AccountController.viewTransactions);
router.get('/users/:email/accounts', validateUser.emailAdd, validate, Verification.user, AccountController.viewAcctBYEmail);
router.get('/transactions/:id',validateUser.identity, validate, Verification.user, AccountController.viewOne); 
router.get('/accounts/:accountNumber', validateUser.accountNumber, validate, Verification.user, AccountController.viewAcctDetails); 
router.get('/accounts', Verification.admin, AccountController.viewAllAccounts);
export default router;
