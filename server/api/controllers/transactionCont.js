import transactions from '../models/Transactions';
import accounts from '../models/Accounts';

export default class TransactionController {
  static creditAccount(req, res) {
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
      type: 'credit',
      accountNumber: parseInt(accountNumber, 10),
      cashier: req.user.id,
      amount: parseFloat(amount),
      oldBalance: validAccount.balance,
      newBalance: parseFloat((validAccount.balance + parseFloat(amount)).toFixed(2)),
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