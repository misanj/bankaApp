/* eslint-disable class-methods-use-this */
import users from '../models/users';
import Auth from '../utils/authenticate';

class UserController {
  // /**
  // * @method signUp
  // * @description Adds a user to the database
  // * @param {object} req - The Request Object
  // * @param {object} res - The Response Object
  // * @returns {object} JSON API Response
  // */
  async signUp(req, res) {
    try {
      const result = await users.create(req.body);
      const user = result.rows[0];
      //
      const token = Auth.generateToken({ id: user.id, email: user.email });
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          token,
          id: user.id,
          firstName: user.firstname,
          lastName: user.lastname,
          email: user.email,
        }],
      });
    } catch (error) {
      if (error.routine === '_bt_check_unique') {
        return res.status(422).json({
          status: res.statusCode,
          error: 'email already exist, please choose another one',
        });
      }
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}
const userController = new UserController();
export default userController;
