import { check } from 'express-validator/check';

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

const account = [
  check('type').not().isEmpty().withMessage('Type should not be left empty'),
  check('type').isAlpha().trim().withMessage('Type can only contain letters'),
  check('status').not().isEmpty().withMessage('Status should not be left empty'),
  check('status').isAlpha().trim().withMessage('Status can only contain letters'),
];

const transactions = [
  check('amount').not().isEmpty().withMessage('Amount should not be left empty'),
  check('amount').isNumeric().trim().withMessage('Amount must be Numeric'),
];

const validateUser = {
  signUp,
  signIn,
  account,
  transactions,
};
export default validateUser;
