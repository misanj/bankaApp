
/* eslint-disable class-methods-use-this */
import accounts from '../models/accounts';

class AcctController {
  async createAccount(req, res) {
    try {
      const { rows } = await accounts.create(req.body.type, req);
      return res.status(201).json({
        status: res.statusCode,
        data: [{
          accountNumber: rows[0].account_number,
          firstName: req.user.firstname,
          lastName: req.user.lastname,
          email: req.user.email,
          type: rows[0].type,
          openingBalance: rows[0].balance,
        }],
      });
    } catch (error) {
      return res.status(400).json({
        status: res.statusCode,
        error: error.detail,
      });
    }
  }
}
const accountController = new AcctController();
export default accountController;


// ACTIVATE AND DEACTIVATE ACCOUNT
//   static accountStatus(req, res) {
//     const { status } = req.body;
//     const { accountNumber } = req.params;
//     const validAccount = accounts
//       .find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
//     if (validAccount) {
//       return res.status(200).json({
//         status: res.statusCode,
//         data: {
//           accountNumber,
//           status,
//         },
//       });
//     }
//     return res.status(404).json({
//       status: res.statusCode,
//       error: `Account ${accountNumber} does not exist`,
//     });
//   }

//   // eslint-disable-next-line consistent-return
//   static deleteAccount(req, res) {
//     const { accountNumber } = req.params;
//     const validAccount = accounts
//       .find(eachAccount => eachAccount.accountNumber === parseInt(accountNumber, 10));
//     if (!validAccount) {
//       return res.status(404).json({
//         status: res.statusCode,
//         error: `Account ${accountNumber} does not exist`,
//       });
//     }
//     accounts.forEach((account) => {
//       if (account.accountNumber === parseInt(accountNumber, 10)) {
//         const indexNumber = accounts.indexOf(account);
//         accounts.splice(indexNumber, 1);
//         res.status(200).json({
//           status: res.statusCode,
//           message: 'Account successfully deleted!',
//         });
//       }
//     });
//   }
// }
// export default AccoountController;
