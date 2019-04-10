import users from '../models/users';
import Auth from '../utils/authenticate';

class UserController {
  static signup(req, res) {
    const {
      firstName, lastName, email, password,
    } = req.body;
    let emailExists = false;

    users.forEach((user) => {
      if (email === user.email) {
        emailExists = true;
      }
    });
    if (emailExists) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'email already exists, please choose another',
      });
    }

    const user = {
      id: users.length + 1,
      email,
      firstName,
      lastName,
      password: Auth.hashPassword(password),
      type: 'client',
    };
    users.push(user);
    const token = Auth.generateToken({ id: user.id, email, type: user.type });
    return res.status(201).json({
      status: res.statusCode,
      data: {
        token,
        id: user.id,
        firstName,
        lastName,
        email,
      },
    });
  }
}

export default UserController;
