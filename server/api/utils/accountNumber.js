/* eslint-disable class-methods-use-this */
class AcctNumber {
  generateAcctNum() {
    let numString = '';

    while (numString.length < 10) {
      numString += Math.floor(Math.random() * 10);
    }
    return parseInt(numString, 10);
  }
}

const acctNumber = new AcctNumber();

export default acctNumber;
