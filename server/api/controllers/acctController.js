
/* eslint-disable class-methods-use-this */
import accounts from '../models/accounts';
import Transactions from '../models/transactionsdb';
/**
 * @class AccountController
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
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account number ${accountNumber} does not exist`,
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
  
  /**
  * @method viewTransactions
  * @description Fetches all user account transaction history from the databsae
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async viewTransactions(req, res) {
    try{
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const result = await Transactions.getTransactions(accountNumber);
      if(result.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `This account ${accountNumber} does not have any transactions yet`,
        });
      }return res.status(200).json({
        status: res.statusCode,
        data: [result.rows],
      });
    }catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method viewOne
  * @description Fetches user account transaction history for a particular transaction
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async viewOne(req, res) {
    try{
      const id = parseInt(req.params.id);
      const result = await Transactions.getAtransac(req);
      if(result.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `This account ${id} does not have any transactions yet`,
        });
      }return res.status(200).json({
        status: res.statusCode,
        data: result.rows[0],
      });
    }catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method viewAcctDetails
  * @description Fetches user account details from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async viewAcctDetails(req, res) {
    try{
      const accountNumber = parseInt(req.params.accountNumber);
      const result = await accounts.getDetails(req);
      if(result.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `This account ${accountNumber} does not exist`,
        });
      }return res.status(200).json({
        status: res.statusCode,
        data: result.rows[0],
      });
    }catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }

  /**
  * @method viewAllAccounts
  * @description Fetches all accounts, acitive and dormant accounts from the database
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
 async viewAllAccounts(req, res) {
  try{
    if (req.query.status !== '') {
      const result = await accounts.getByStatus(req.query.status);
      return res.status(200).json({
        status: res.statusCode,
        data: result.rows,
      });
    }
    const result = await accounts.getAccounts();
    return res.status(200).json({
      status: res.statusCode,
      data: result.rows,
    });
  }catch (error) {
    return res.status(400).json({
      status: res.statusCode,
      error: error.detail,
    });
  }
}

}
export default new AccountController();
