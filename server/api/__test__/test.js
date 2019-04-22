/* eslint-disable no-shadow */
import chai from 'chai';
import chaihttp from 'chai-http';
import app from '../../app';

chai.use(chaihttp);
chai.should();

describe('user sign up tests', () => {
  it('should not create user if firstName is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '',
        lastName: 'user',
        email: 'test@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not create user if firstName is not Alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: '23evid',
        lastName: 'user',
        email: 'test@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });


  it('should not create user if lastName is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: '',
        email: 'test@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not create user if lastName is not Alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: '23evid',
        email: 'test@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not create user if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: '',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not create user if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'test@com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not create user if password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'test@com',
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should successfully create user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'teni',
        lastName: 'femi',
        email: 'femi2@gmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        // res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('token');
        res.body.data[0].should.have.property('firstName');
        res.body.data[0].should.have.property('lastName');
        res.body.data[0].should.have.property('email');
        done();
      });
  });

  it('should not create an account with an email that already exists', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'femi2@gmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.be.a('object');
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.error.should.equal('email already exist, please choose another one');
        done();
      });
  });
});
describe('user sign in tests', () => {
  it('should not sign in user if email is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: '',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not sign in user if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'test@com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not sign in user if password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send({
        firstName: 'test',
        lastName: 'user',
        email: 'test@com',
        password: '',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should successfully sign in a user', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'femi2@gmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('data');
        res.body.data.should.be.a('array');
        res.body.data[0].should.have.property('token');
        res.body.data[0].should.have.property('id');
        res.body.data[0].should.have.property('firstName');
        res.body.data[0].should.have.property('lastName');
        res.body.data[0].should.have.property('email');
        done();
      });
  });
  it('should not sign in user if email does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'fa@testmail.com',
        password: 'pA55w0rd',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.error.should.equal('Authentication Error');
        done();
      });
  });
  it('should not sign in user if password does not exist', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'femi2@gmail.com',
        password: 'pA5',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('status');
        res.body.should.have.property('error');
        res.body.error.should.equal('Authentication Error');
        done();
      });
  });
});

describe('create account tests', () => {
  it('should not create a bank account if type is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'femi2@gmail.com',
        password: 'pA55w0rd',
      })
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', token)
          .send({
            type: '',
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            done();
          });
      });
  });

  it('should not create a bank account if type is not alphabets', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'femi2@gmail.com',
        password: 'pA55w0rd',
      })
      .end((error, response) => {
        const token = `Bearer ${response.body.data.token}`;
        chai.request(app)
          .post('/api/v1/accounts')
          .set('Authorization', token)
          .send({
            type: '225savig',
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('error');
            done();
          });
      });
  });

  it('should successfully create a bank account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'femi2@gmail.com',
        password: 'pA55w0rd',
      })
      .end((error, response) => {
        const token = `Bearer ${response.body.data[0].token}`;
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
            res.body.data.should.be.a('array');
            res.body.data[0].should.have.property('accountNumber');
            res.body.data[0].should.have.property('firstName');
            res.body.data[0].should.have.property('lastName');
            res.body.data[0].should.have.property('email');
            res.body.data[0].should.have.property('type');
            res.body.data[0].should.have.property('openingBalance');
            done();
          });
      });
  });
});
