
/* eslint-disable class-methods-use-this */
import accounts from '../models/Accounts';

class AccoountController {
  static createAccount(req, res) {
    const { type } = req.body;
    const genAccountNo = Math.floor(Math.random() * 10000000000);
    const initialBalance = parseFloat('0.1001');
    const account = {
      id: accounts.length + 1,
      accountNumber: genAccountNo,
      createdOn: new Date(),
      owner: req.user.id,
      type,
      status: 'active',
      balance: initialBalance,
    };
    accounts.push(account);
    return res.status(201).json({
      status: res.statusCode,
      data: {
        accountNumber: account.accountNumber,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        type: account.type,
        openingBalance: account.balance,
      },
    });
  }

  // ACTIVATE AND DEACTIVATE ACCOUNT
  static accountStatus(req, res) {
    const { status } = req.body;
    const { accountNumber } = req.params;
    const validAccount = accounts
      .find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
    if (validAccount) {
      return res.status(200).json({
        status: res.statusCode,
        data: {
          accountNumber,
          status,
        },
      });
    }
    return res.status(404).json({
      status: res.statusCode,
      error: `Account ${accountNumber} does not exist`,
    });
  }

  // eslint-disable-next-line consistent-return
  static deleteAccount(req, res) {
    const { accountNumber } = req.params;
    const validAccount = accounts
      .find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
    if (!validAccount) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account ${accountNumber} does not exist`,
      });
    }
    accounts.forEach((account) => {
      if (account.accountNumber === parseInt(accountNumber, 10)) {
        const indexNumber = accounts.indexOf(account);
        accounts.splice(indexNumber, 1);
      }
      return res.status(200).json({
        status: res.statusCode,
        message: 'Account successfully deleted!',
      });
    });
  }
}
export default AccoountController;
