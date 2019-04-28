/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from '../database/db';

/**
 * @export Transactions
 * @class Transactions
 */
class Transactions {
  /**
    * @method creDeb
    * @description Adds transaction to the database
    * @param {object} req - The Request Object
    * @param {object} account - An object containing the account details
    * @param {string} type - A string representing the type of transaction i.e credit
    * @returns {object} JSON API Response
    */
  creDeb(req, account, type) {
    const queryText = `INSERT INTO transactions("createdon", type,
      account_number, cashier, amount, "old_balance", "new_balance") 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id, "account_number", amount, cashier, type, "new_balance";`;
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const newBalance = Transactions.getBalance(account.balance, req.body.amount, type);
    const values = [
      moment(new Date()),
      type,
      accountNumber,
      req.user.id,
      parseFloat(req.body.amount),
      account.balance,
      newBalance,
    ];

    const result = db.query(queryText, values);
    return result;
  }

  /**
    * @method getTransactions
    * @description fetches all account transaction on a particular account
    * @param {object} accountNumber - An object containing the account details
    * @returns {object} JSON API Response
    */
  getTransactions(accountNumber) {
    const queryText = `SELECT transactions.id AS "transactionId", transactions.createdon, transactions.type,
    transactions.account_number, transactions.amount, transactions.old_balance,
    transactions.new_balance FROM transactions WHERE account_number=$1`;
    const result = db.query(queryText, [accountNumber]);
    return result;
  }

  /**
    * @method getAtransac
    * @description fetches a specific transaction using the transaction Id
    * @param {object} req - The request object
    * @returns {object} JSON API Response
    */
  async getAtransac(req) {
    const queryText = `SELECT transactions.id AS "transactionId", transactions.createdon, transactions.type,
    transactions.account_number, transactions.amount, transactions.old_balance,
    transactions.new_balance FROM transactions WHERE id=$1`;
        const values = [req.params.id];
    const result = await db.query(queryText, values);
    return result;
  }

  /**
  * @method getBalance
  * @param {object} accountBalance - The previous account balance
  * @param {object} amount - The transaction amount
  * @param {string} type - A string representing the type of transaction
  * @returns {object} JSON API Result
  */
  static getBalance(accountBalance, amount, type) {
    const credit = parseFloat((parseFloat(accountBalance) + parseFloat(amount)).toFixed(2));
    const debit = parseFloat((parseFloat(accountBalance) - parseFloat(amount)).toFixed(2));
    return type === 'credit' ? credit : debit;
  }
}
export default new Transactions();
