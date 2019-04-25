import moment from 'moment';
import Pool from './db';
import Auth from '../utils/authenticate';

const queryText = `
  INSERT INTO users (firstname, lastname, email, password, type, isAdmin) 
  VALUES ('Aisha', 'Abdulkareem', 'aishabd@gmail.com', '${Auth.hashPassword('password')}', 'admin', true),
         ('Dasola', 'Akolo', 'dassyakolo@gmail.com', '${Auth.hashPassword('password')}', 'staff', false);
         
  INSERT INTO users (firstname, lastname, email, password, isAdmin) 
  VALUES ('Kaffelat', 'Adenike', 'kaffee@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Chuks', 'Michael', 'chuks.mike@gmail.com', '${Auth.hashPassword('password')}', false),
         ('Pelumi', 'Alesh', 'aleshs@gmail.com', '${Auth.hashPassword('password')}', false);
         
  INSERT INTO accounts(account_number, createdon, client_id, type, status, balance) 
  VALUES(1758964523, '${moment(new Date())}', 2, 'savings', 'dormant', 800000.58),
        (7596841530, '${moment(new Date())}', 5, 'current', 'active', 50000.56),
        (5823642528, '${moment(new Date())}', 4, 'current', 'dormant', 0.00),
        (5428745632, '${moment(new Date())}', 3, 'savings', 'active', 200000.00),
        (8745521633, '${moment(new Date())}', 3, 'savings', 'active', 40000.35);
        
  INSERT INTO transactions(createdon, type, account_number, cashier, amount, old_balance, new_balance) 
  VALUES('${moment(new Date())}', 'credit', 1758964523, 2, 25000.00, 800000.58, 825000.58),
        ('${moment(new Date())}', 'credit', 7596841530, 2, 300000.00, 50000.56, 350000.56),
        ('${moment(new Date())}', 'credit', 5823642528, 2, 50000.00, 0.00, 50000.00),
        ('${moment(new Date())}', 'debit', 8745521633, 2, 35000.00, 200000.00, 165000.00),
        ('${moment(new Date())}', 'debit', 5428745632, 2, 1500.00, 40000.35, 38500.35);
`;

Pool.query(queryText);
