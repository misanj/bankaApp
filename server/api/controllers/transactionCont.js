/* eslint-disable class-methods-use-this */
import Transactions from '../models/transactionsdb';
import accounts from '../models/accounts';

/**
 * @class TransactionController
 * @description Contains controller methods for each transaction related endpoint
 * @export transactionController
 */

class TransactionController {
  /**
  * @method creditAccount
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async creditAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const accountResult = await accounts.find(accountNumber);
      if (!accountResult.rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account ${accountNumber} does not exist`,
        });
      }
      const accountDetails = accountResult.rows[0];
      const result = await Transactions.creDeb(req, accountDetails, 'credit');
      const transaction = result.rows[0];
      accounts.updateBalance(accountNumber, transaction.new_balance);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transaction.id,
          accountNumber: transaction.account_number,
          amount: parseFloat(transaction.amount),
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.new_balance,
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
  *  @method debitAccount
  * @description Credits a user's bank account
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */
  async debitAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const accountResult = await accounts.find(accountNumber);
      if (!accountResult.rows[0]) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account ${accountNumber} does not exist`,
        });
      }
      const accountDetails = accountResult.rows[0];
      const result = await Transactions.creDeb(req, accountDetails, 'debit');
      const transaction = result.rows[0];
      accounts.updateBalance(accountNumber, transaction.new_balance);

      return res.status(201).json({
        status: res.statusCode,
        data: [{
          transactionId: transaction.id,
          accountNumber: transaction.account_number,
          amount: parseFloat(transaction.amount),
          cashier: transaction.cashier,
          transactionType: transaction.type,
          accountBalance: transaction.new_balance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}
export default new TransactionController();
