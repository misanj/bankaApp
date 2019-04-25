import { validationResult } from 'express-validator/check';

const validate = (req, res, next) => {
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
};

export default validate;
