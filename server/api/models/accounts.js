/* eslint-disable class-methods-use-this */
import moment from 'moment';
import AcctNumber from '../utils/accountNumber';
import db from '../database/db';

class Account {
  create(data, req) {
    const queryText = `INSERT INTO accounts(account_number, createdon, client_id,
        type) 
        VALUES ($1, $2, $3, $4) 
        RETURNING account_number, type, balance;`;

    const values = [
      AcctNumber.generateAcctNum(),
      moment(new Date()),
      req.user.id,
      data,
    ];

    const result = db.query(queryText, values);
    return result;
  }

  async updateAcctStatus(accountNumber, status) {
    const query = 'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *;';

    const result = db.query(query, [status, accountNumber]);
    return result;
  }

  delete(accountNumber) {
    const query = 'DELETE FROM accounts WHERE "account_number" = $1';
    const result = db.query(query, [accountNumber]);
    return result;
  }

  /**
  * @method updateBalance
  * @description Updates the account balance
  * @param {*} accountNumber - The accountNumber
  * @param{*} balance - The  new balance of the account
  * @returns {object} the account details
  */
  updateBalance(accountNumber, balance) {
    const query = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *;';
    const result = db.query(query, [balance, accountNumber]);
    return result;
  }

  find(accountNumber) {
    const query = 'SELECT * FROM accounts WHERE account_number = $1;';
    const result = db.query(query, [accountNumber]);
    return result;
  }
}
const account = new Account();
export default account;
