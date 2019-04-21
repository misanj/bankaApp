import Pool from './db';

const queryText = 'DROP TABLE IF EXISTS users, accounts, transactions CASCADE';

Pool.query(queryText);
