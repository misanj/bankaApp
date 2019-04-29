import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';

const log = debug('dev');

dotenv.config();

const connectionString = process.env.DATABASE_URL;
// if (process.env.ENV_DEVELOPMENT){
//    connectionString = process.env.DEVELOPMENT_URL;
// }

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => log('connected to the db'));

pool.on('remove', () => log('connection terminated'));

export default pool;
