/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from '../database/db';

/**
 * @exports Transaction
 * @class Transaction
 */
class Transactions {
  /**
    * @method createCredit
    * @description Adds a credit transaction to the database
    * @param {object} req - The Request Object
    * @param {object} account - An object containing the account details
    * @param {string} type - A string representing the type of transaction i.e credit
    * @returns {object} JSON API Response
    */
  createCredit(req, account, type) {
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
  * @method getBalance
  * @param {object} accountBalance - The previous account balance
  * @param {object} amount - The transaction amount
  * @param {string} type - A string representing the type of transaction
  * @returns {object} JSON API Response
  */
  static getBalance(accountBalance, amount, type) {
    const credit = parseFloat((parseFloat(accountBalance) + parseFloat(amount)).toFixed(2));
    const debit = parseFloat((parseFloat(accountBalance) - parseFloat(amount)).toFixed(2));
    return type === 'credit' ? credit : debit;
  }
}
export default new Transactions();
