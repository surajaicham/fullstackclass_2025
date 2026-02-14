const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dvdrental',
  password: 'p@ssw0rd',
  port: 5432,
})

pool.on('connect', client => {
  client.query("SET search_path TO public");
});

module.exports = pool;