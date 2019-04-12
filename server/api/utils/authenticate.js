import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

dotenv.config();

const secret = process.env.SECRET;

class Auth {
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static generateToken(payload) {
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    return token;
  }

  static verifyPassword(plainTextPassword, hashedPassword) {
    return bcrypt.compareSync(plainTextPassword, hashedPassword);
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, secret);
    return decoded;
  }
}

export default Auth;
