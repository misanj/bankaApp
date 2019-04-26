import Auth from '../utils/authenticate';
import db from '../database/db';

/**
 * @exports
 * @class User
 */
class User {
  /**
   * @param {*} data
   * @returns { object } user object
   */
  // eslint-disable-next-line class-methods-use-this
  create(data) {
    const queryText = `INSERT INTO users (firstname, lastname, email, password) 
    VALUES($1, $2, $3, $4)
    RETURNING *`;

    const {
      firstName, lastName, email, password,
    } = data;

    const hashedPassword = Auth.hashPassword(password);
    const values = [firstName, lastName, email, hashedPassword];
    const result = db.query(queryText, values);
    return result;
  }

  /**
   * @param {*} data
   * @returns { object } user object
   */
  // eslint-disable-next-line class-methods-use-this
  find(email) {
    const query = 'SELECT * FROM users WHERE email=$1';
    const result = db.query(query, [email]);
    return result;
  }
}
export default new User();
