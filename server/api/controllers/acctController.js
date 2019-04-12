/* eslint-disable class-methods-use-this */
import accounts from '../models/accounts';

class AccoountController {
  static createAccount(req, res) {
    const { type } = req.body;
    const genAccountNo = Math.floor((Math.random() * 1000000000) + 1);
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
}
export default AccoountController;
