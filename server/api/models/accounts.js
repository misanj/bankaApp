/* eslint-disable class-methods-use-this */
import moment from 'moment';
import AcctNumber from '../utils/accountNumber';
import db from '../database/db';

/**
 * @class account
 * @description Contains controller methods for each transaction related endpoint
 * @export Account
 */

class Account {
  /**
  * @method create
  * @description Adds user account to data base
  * @param {object} req - The Request Object
  * @param {object} res - The Response Object
  * @returns {object} JSON API Response
  */

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

  /**
    * @method updateAcctStatus
    * @description Updates User account status in the database
    * @param { * } accountNumber - The Account Number
    * @param { * } status - The Status of the Account
    * @returns {object} The account details
    */

  async updateAcctStatus(accountNumber, status) {
    const query = 'UPDATE accounts SET status = $1 WHERE account_number = $2 RETURNING *;';

    const result = db.query(query, [status, accountNumber]);
    return result;
  }

  /**
    * @method delete
    * @description Deletes an account
    * @param { * } accountNumber - The Request Object
    * @returns {object} JSON API Response
    */

  delete(accountNumber) {
    const query = 'DELETE FROM accounts WHERE "account_number" = $1';
    const result = db.query(query, [accountNumber]);
    return result;
  }

  /**
  * @method updateBalance
  * @description Updates account balance
  * @param {*} accountNumber - The accountNumber
  * @param {*} balance - The  new balance of the account
  * @returns {object} the account details
  */
  updateBalance(accountNumber, balance) {
    const query = 'UPDATE accounts SET balance = $1 WHERE account_number = $2 RETURNING *;';
    const result = db.query(query, [balance, accountNumber]);
    return result;
  }

  /**
  * @method find
  * @description Finds and returns account details
  * @param {*} accountNumber - The accountNumber
  * @returns {object} the account details
  */

  find(accountNumber) {
    const query = 'SELECT * FROM accounts WHERE account_number = $1;';
    const result = db.query(query, [accountNumber]);
    return result;
  }

  /**
  * @method getDetails
  * @description Fetches account user account details from database
  * @param {*} req - The Request object
  * @returns {object} API JSON Response
  */
  async getDetails(req) {
    const queryText = `SELECT accounts.createdon, accounts.account_number,
    users.email, accounts.type, accounts.status, 
    accounts.balance FROM users JOIN accounts on users.id = accounts.client_id WHERE account_number = $1;`;
        const values = [req.params.accountNumber];
    const result = await db.query(queryText, values);
    return result;
  }

  /**
  * @method getAccounts
  * @description Fetches account user account details from database
  * @returns {object} API JSON Response
  */
 async getAccounts () {
  const queryText = `SELECT accounts.createdon, accounts.account_number,
  users.email, accounts.type, accounts.status, 
  accounts.balance FROM users JOIN accounts on users.id = accounts.client_id`;
  const result = await db.query(queryText);
  return result;
  }
}
export default new Account();
