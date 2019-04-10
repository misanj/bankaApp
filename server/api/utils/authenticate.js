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
}

export default Auth;
