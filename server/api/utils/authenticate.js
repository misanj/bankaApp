/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const secret = process.env.SECRET;

class Auth {
  hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  generateToken(payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  verifyPassword(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }

  verifyToken(token) {
    const decoded = jwt.verify(token, secret);
    return decoded;
  }
}

const auth = new Auth();

export default auth;
