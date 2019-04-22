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

    const results = db.query(queryText, values);
    return results;
  }
}
const account = new Account();
export default account;
