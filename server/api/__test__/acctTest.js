import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../app';

chai.use(chaihttp);
chai.should();

describe('create account tests', () => {
  it('should successfully create a bank account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'client@banka.com',
        password: 'password',
      })
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', token)
          .send({
            type: 'savings',
          })
          .end((err, res) => {
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            res.body.data.should.have.property('accountNumber');
            res.body.data.should.have.property('firstName');
            res.body.data.should.have.property('lastName');
            res.body.data.should.have.property('email');
            res.body.data.should.have.property('type');
            res.body.data.should.have.property('openingBalance');
            done();
          });
      });
  });
});
