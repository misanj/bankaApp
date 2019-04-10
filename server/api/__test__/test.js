import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../app';

chai.use(chaihttp);
chai.should();

describe('user sign up tests', () => {
  it('should successfully create a user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'test@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('token');
        res.body.data.should.have.property('email');
        done();
      });
  });
  it('should not create an account with an email that already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'test@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.error.should.equal('email already exists, please choose another');
        done();
      });
  });
});
