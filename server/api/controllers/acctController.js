
/* eslint-disable class-methods-use-this */
import accounts from '../models/accounts';

class AcctController {
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

  async activateDeactivate(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const result = await accounts.updateAcctStatus(accountNumber, req.body.status);
      if (result.rowCount < 1) {
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

  async deleteAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const result = await accounts.delete(accountNumber);
      if (result.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account with account number ${accountNumber} does not exist`,
        });
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Account successfully deleted',
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}
const accountController = new AcctController();
export default accountController;
