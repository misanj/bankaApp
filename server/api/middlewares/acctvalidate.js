/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { check, validationResult } from 'express-validator/check';

const validateCreate = [
  check('type').not().isEmpty().withMessage('Type should not be left empty'),
  check('type').isAlpha().trim().withMessage('Type can only contain letters'),
  (req, res, next) => {
    const errors = validationResult(req);
    const errMessages = [];
    if (!errors.isEmpty()) {
      errors.array().forEach((err) => {
        errMessages.push(err.msg);
      });
      return res.status(401).json({
        status: 401,
        error: errMessages,
      });
    }
    return next();
  },
];
export default validateCreate;
