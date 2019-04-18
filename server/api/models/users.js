import Auth from '../utils/authenticate';

const users = [
  {
    id: 1,
    firstName: 'john',
    lastName: 'doe',
    email: 'admin@banka.com',
    password: Auth.hashPassword('password'),
    type: 'staff',
    isAdmin: true,
  },
  {
    id: 2,
    firstName: 'temisan',
    lastName: 'otokuefor',
    email: 'staff@banka.com',
    password: Auth.hashPassword('password'),
    type: 'staff',
    isAdmin: false,
  },

  {
    id: 3,
    firstName: 'aboki',
    lastName: 'james',
    email: 'client@banka.com',
    password: Auth.hashPassword('password'),
    type: 'client',
  },
  {
    id: 4,
    firstName: 'john',
    lastName: 'brad',
    email: 'brad@banka.com',
    password: Auth.hashPassword('password'),
    type: 'client',
  },

];

export default users;
