import query from './index';

const queryText = 'DROP TABLE IF EXISTS users, accounts, transactions CASCADE';

query(queryText);
