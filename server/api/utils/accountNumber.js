/* eslint-disable class-methods-use-this */
/**
 * @class AcctNumber
 * @description Generates random account number
 * @export AcctNumber
 */

class AcctNumber {
  /**
  * @method generateAcctNum
  * @description Generates random account number
  * @returns {integer} The generated account number
  */

  generateAcctNum() {
    let numString = '';

    while (numString.length < 10) {
      numString += Math.floor(Math.random() * 10);
    }
    return parseInt(numString, 10);
  }
}

export default new AcctNumber();
