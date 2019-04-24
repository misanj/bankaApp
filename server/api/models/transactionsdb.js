/* eslint-disable class-methods-use-this */
import moment from 'moment';
import db from '../database/db';

class Transactions {
  createCredit(req, account, type) {
    const queryText = `INSERT INTO transactions("createdOn", type,
      account_number, cashier, amount, "old_balance", "new_balance") 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      RETURNING id, "account_number", amount, cashier, type, "new_balance";`;
    const accountNumber = parseInt(req.params.accountNumber, 10);
    const newBalance = Transactions.balance(account.balance, req.body.amount, type);
    const values = [
      moment(new Date()),
      type,
      accountNumber,
      req.user.id,
      parseFloat(req.body.amount),
      account.balance,
      newBalance,
    ];

    const results = db.query(queryText, values);
    return results;
  }
}
const transactions = new Transactions();
export default transactions;
