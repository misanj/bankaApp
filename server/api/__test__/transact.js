import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../app';

chai.use(chaihttp);
chai.should();

describe('Transactions Tests', () => {
  it('should successfully credit user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'staff@banka.com',
        password: 'password',
      })
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(app)
          .post('/api/v1/transactions/2986431920/credit')
          .set('Authorization', token)
          .send({
            amount: 5000,
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('transactionId');
            res.body.data.should.have.property('accountNumber');
            res.body.data.should.have.property('amount');
            res.body.data.should.have.property('cashier');
            res.body.data.should.have.property('transactionType');
            res.body.data.should.have.property('accountBalance');
            done();
          });
      });
  });
});
describe('Transactions Tests', () => {
  it('should successfully debit user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'staff@banka.com',
        password: 'password',
      })
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(app)
          .post('/api/v1/transactions/2986431920/debit')
          .set('Authorization', token)
          .send({
            amount: 5000,
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('transactionId');
            res.body.data.should.have.property('accountNumber');
            res.body.data.should.have.property('amount');
            res.body.data.should.have.property('cashier');
            res.body.data.should.have.property('transactionType');
            res.body.data.should.have.property('accountBalance');
            done();
          });
      });
  });
});
