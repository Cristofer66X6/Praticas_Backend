const { Pool } = require('pg');
const dotenv = require('dotenv');

/* istanbul ignore next */
dotenv.config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' });

const pool = new Pool({
  connectionString: process.env.DB_URL,
});

module.exports = pool;
