import { check, param } from 'express-validator/check';

const signUp = [
  check('firstName').not().isEmpty().withMessage('First Name should not be left empty'),
  check('lastName').not().isEmpty().withMessage('Last Name should not be left empty'),
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('email').not().isEmpty().withMessage('Input email address'),
  check('password').not().isEmpty().withMessage('Input password'),
  check('firstName').isAlpha().trim().withMessage('firstName can only contain letters'),
  check('lastName').isAlpha().trim().withMessage('lastName can only contain letters'),
];

const signIn = [
  check('email').isEmail().trim().withMessage('Input a valid email address'),
  check('email').not().isEmpty().withMessage('Input email address'),
  check('password').not().isEmpty().withMessage('Input password'),
];

const accountCreate = [
  check('type').not().isEmpty().withMessage('Type should not be left empty'),
  check('type').isAlpha().trim().withMessage('Type can only contain letters'),
];

const accountStatus = [
  check('status').not().isEmpty().withMessage('Status should not be left empty'),
  check('status').isAlpha().trim().withMessage('Status can only contain letters'),
];
const transactionsCre = [
  check('amount').not().isEmpty().withMessage('Amount should not be left empty'),
  check('amount').isNumeric().trim().withMessage('Amount must be Numeric'),
  // check('token').isAlphanumeric().trim().withMessage('Please Insert Your Token'),
];

const accountNumber = [
  param('accountNumber').not().isEmpty().withMessage('accountNumber must not be empty'),
  param('accountNumber').isNumeric().trim().withMessage('accountNumber can only be numeric'),
];
const identity = [
  param('id').not().isEmpty().withMessage('id must not be empty'),
  param('id').isNumeric().trim().withMessage('id can only be numeric'),
];

const emailAdd = [
  param('email').not().isEmpty().withMessage('email must not be empty'),
  param('email').isEmail().trim().withMessage('email must be a valid one'),
];

const validateUser = {
  signUp,
  signIn,
  accountCreate,
  accountStatus,
  transactionsCre,
  accountNumber,
  identity,
  emailAdd,
};
export default validateUser;
