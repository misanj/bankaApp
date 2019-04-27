import { Pool } from 'pg';
import dotenv from 'dotenv';
import debug from 'debug';

const log = debug('dev');

dotenv.config();
let connectionString = process.env.DATABASE_URL;
// if (NODE_ENV = production){
//   connectionString = process.env.DATABASE_URL;
// }else if(NODE_ENV = test){
//   connectionString = process.env.DATABASE_development;
// }else{
//   connectionString = process.env.DATABASE_URL;
// }

const pool = new Pool({
  connectionString,
});

pool.on('connect', () => log('connected to the db'));

pool.on('remove', () => log('connection terminated'));

export default pool;
