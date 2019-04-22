/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
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
        lastName: 'otokuefor',
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        lastName: 'otokuefor',
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        firstName: 'temisan',
        lastName: '',
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        firstName: 'temisan',
        lastName: '23evid',
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        firstName: 'temisa',
        lastName: 'otokuefor',
        email: '',
        password: 'devcrush',
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
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: 'temisan@gm',
        password: 'devcrush',
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
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: 'temisan@gmail.com',
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
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
      .post('/api/v1/auth/signin')
      .send({
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: '',
        password: 'devcrush',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not sign in user if email is invalid', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: 'temisannn@gmail.com',
        password: 'devcrush',
      })
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('error');
        done();
      });
  });

  it('should not sign in user if password is empty', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signin')
      .send({
        firstName: 'temisan',
        lastName: 'otokuefor',
        email: 'temisan@gmail.com',
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
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        password: 'devcrush',
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
        email: 'temisan@gmail.com',
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
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
        email: 'temisan@gmail.com',
        password: 'devcrush',
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
// describe('Activate and Deactivate account test', () => {
//   it('should not be able to change account status if user is not admin', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'temisan@gmail.com',
//         password: 'devcrush',
//       })
//       .end((error, response) => {
//         const token = `Bearer ${response.body.data.token}`;
//         chai.request(app)
//           .patch('/api/v1/accounts/5428745632')
//           .set('Authorization', token)
//           .send({
//             status: 'active',
//           })
//           .end((err, res) => {
//             res.should.have.status(403);
//             res.body.should.have.property('status');
//             res.body.should.have.property('error');
//             res.body.error.should.equal('The endpoint you are requesting is forbidden');
//             done();
//           });
//       });
//   });

//   it('should throw an error when an incorrect token is entered', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'aishabd@gmail.com',
//         password: 'password',
//       })
//       .end((error, response) => {
//         const token = `Bearer ${response.body.data.token}`;
//         chai.request(app)
//           .patch('/api/v1/accounts/5428745632')
//           .set('Authorization', tokennn)
//           .send({
//             status: 'dormant',
//           })
//           .end((err, res) => {
//             res.should.have.status(401);
//             res.body.should.have.property('status');
//             res.body.should.have.property('error');
//             res.body.error.should.equal('Authentication Failed');
//             done();
//           });
//       });
//   });

//   it('should sucessfully change account status', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'aishabd@gmail.com',
//         password: 'password',
//       })
//       .end((error, response) => {
//         const token = `Bearer ${response.body.data.token}`;
//         chai.request(app)
//           .patch('/api/v1/accounts/5428745632')
//           .set('Authorization', token)
//           .send({
//             status: 'dormant',
//           })
//           .end((err, res) => {
//             res.should.have.status(200);
//             res.body.should.be.a('object');
//             res.body.should.have.property('data');
//             res.body.data.should.be.a('array');
//             res.body.data[0].should.have.property('accountNumber');
//             res.body.data[0].should.have.property('status');
//             done();
//           });
//       });
//   });

//   it('should not change account status if account number does not exist', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'aishabd@gmail.com',
//         password: 'password',
//       })
//       .end((error, response) => {
//         const token = `Bearer ${response.body.data.token}`;
//         chai.request(app)
//           .patch('/api/v1/accounts/5428745632')
//           .set('Authorization', token)
//           .send({
//             status: 'active',
//           })
//           .end((err, res) => {
//             res.should.have.status(404);
//             res.body.should.have.property('status');
//             res.body.should.have.property('error');
//             res.body.error.should.equal(`Account with account number ${accountNumber} does not exist`);
//             done();
//           });
//       });
//   });

//   it('should not change account status if token is empty', (done) => {
//     chai.request(app)
//       .post('/api/v1/auth/signin')
//       .send({
//         email: 'aishabd@gmail.com',
//         password: 'password',
//       })
//       .end((error, response) => {
//         const token = `Bearer ${response.body.data.token}`;
//         chai.request(app)
//           .patch('/api/v1/accounts/5428745632')
//           .set('Authorization')
//           .send({
//             status: 'active',
//           })
//           .end((err, res) => {
//             res.should.have.status(400);
//             res.body.should.have.property('status');
//             res.body.should.have.property('error');
//             done();
//           });
//       });
//   });
// });
