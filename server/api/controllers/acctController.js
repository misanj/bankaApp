
/* eslint-disable class-methods-use-this */
import accounts from '../models/accounts';

/**
 * @class TransactionController
 * @description Contains controller methods for account related endpoint
 * @export AccountController
 */

class AccountController {
  /**
  * @method createAccount
  * @description Creates a user's bank account and adds it to the databse
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */

  async createAccount(req, res) {
    try {
      const { rows } = await accounts.create(req.body.type, req);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          accountNumber: rows[0].account_number,
          firstName: req.user.firstname,
          lastName: req.user.lastname,
          email: req.user.email,
          type: rows[0].type,
          openingBalance: rows[0].balance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method activateDeactivate
  * @description Activates or Deactivate users account in the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */

  async activateDeactivate(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const result = await accounts.updateAcctStatus(accountNumber, req.body.status);
      if (!result.rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }

      const account = result.rows[0];
      return res.status(200).json({
        status: res.statusCode,
        data: [{
          accountNumber: account.account_number,
          status: account.status,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method deleteAccount
  * @description Deletes user account in the databsae
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */


  async deleteAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const result = await accounts.delete(accountNumber);
      if (!result.rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Account deleted sucessfully',
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}
export default new AccountController();
