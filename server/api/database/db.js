import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';

const log = debug('dev');

dotenv.config();
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => log('connected to the db'));

// const query = (queryString, params) => {
//   pool.query(queryString, params)
//     .then(res => log(res))
//     .catch(err => log(err));
// };

pool.on('remove', () => log('connection terminated'));

export default pool;
