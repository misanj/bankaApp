/* eslint-disable class-methods-use-this */
import users from '../models/users';
import Auth from '../utils/authenticate';

/**
 * @class UserController
 * @description Contains controller methods for each user related endpoint
 * @export UserController
 */

class UserController {
  /**
  * @method signUp
  * @description Sign's up users
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
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

  /**
  * @method signIn
  * @description Sign's in users
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */

  async signIn(req, res) {
    const {
      email,
      password,
    } = req.body;

    const result = await users.find(email);

    if (!result.rows[0] || !Auth.verifyPassword(password, result.rows[0].password)) {
      return res.status(401).json({
        status: res.statusCode,
        error: 'Authentication Error',
      });
    }

    const user = result.rows[0];
    const token = Auth.generateToken(user);

    return res.status(200).json({
      status: 200,
      data: [{
        token,
        id: user.id,
        firstName: user.firstname,
        lastName: user.lastname,
        email: user.email,
      }],
    });
  }
}
export default new UserController();
