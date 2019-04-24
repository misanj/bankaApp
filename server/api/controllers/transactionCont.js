/* eslint-disable class-methods-use-this */
import transactions from '../models/transactionsdb';
import accounts from '../models/accounts';

class TransactionController {
  async creditAccount(req, res) {
    try {
      const accountNumber = parseInt(req.params.accountNumber, 10);
      const accountResult = await accounts.find(accountNumber);
      if (accountResult.rowCount < 1) {
        return res.status(404).json({
          status: res.statusCode,
          error: `Account ${accountNumber} does not exist`,
        });
      }
      const accountDetails = { ...accountResult.rows[0] };
      const result = await transactions.createCredit(req, accountDetails, 'credit');
      const transaction = result.rows[0];
      accounts.Balance(accountNumber, transaction.new_balance);

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
      console.log(error);
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }


  // static creditAccount(req, res) {
  //   const { amount } = req.body;
  //   const { accountNumber } = req.params;
  //   const validAccount = accounts
  //     .find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
  //   if (!validAccount) {
  //     return res.status(404).json({
  //       status: res.statusCode,
  //       error: `Account ${accountNumber} does not exist`,
  //     });
  //   }

  //   const transaction = {
  //     id: transactions.length + 1,
  //     createdOn: new Date(),
  //     type: 'credit',
  //     accountNumber: parseInt(accountNumber, 10),
  //     cashier: req.user.id,
  //     amount: parseFloat(amount),
  //     oldBalance: validAccount.balance,
  //     newBalance: parseFloat((validAccount.balance + parseFloat(amount)).toFixed(2)),
  //   };

  //   validAccount.balance = transaction.newbalance;
  //   transactions.push(transaction);

  //   return res.status(201).json({
  //     status: res.statusCode,
  //     data: {
  //       transactionId: transaction.id,
  //       accountNumber,
  //       amount: transaction.amount,
  //       cashier: transaction.cashier,
  //       transactionType: transaction.type,
  //       accountBalance: transaction.newBalance,
  //     },
  //   });
  // }

  static debitAccount(req, res) {
    const { amount } = req.body;
    const { accountNumber } = req.params;
    const validAccount = accounts
      .find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
    if (!validAccount) {
      return res.status(404).json({
        status: res.statusCode,
        error: `Account ${accountNumber} does not exist`,
      });
    }
    const transaction = {
      id: transactions.length + 1,
      createdOn: new Date(),
      type: 'debit',
      accountNumber: parseInt(accountNumber, 10),
      cashier: req.user.id,
      amount: parseFloat(amount),
      oldBalance: validAccount.balance,
      newBalance: parseFloat((validAccount.balance - parseFloat(amount)).toFixed(2)),
    };

    validAccount.balance = transaction.newbalance;
    transactions.push(transaction);

    return res.status(201).json({
      status: res.statusCode,
      data: {
        transactionId: transaction.id,
        accountNumber,
        amount: transaction.amount,
        cashier: transaction.cashier,
        transactionType: transaction.type,
        accountBalance: transaction.newBalance,
      },
    });
  }
}
const transactionController = new TransactionController();
export default transactionController;
