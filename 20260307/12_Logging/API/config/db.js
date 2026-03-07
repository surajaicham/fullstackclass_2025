const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',  // 'db' in Docker, 'localhost' for local dev
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || '123456',
  port: parseInt(process.env.DB_PORT || '5432'),
});
 
 // Set default schema to 'booking' for every new client
 pool.on('connect', client => {
  //console.log("Connected to the database, setting search_path to 'dvdrental'");
   client.query("SET search_path TO public");
  //  var result = client.query("SELECT table_name FROM information_schema.tables WHERE table_catalog='dvdrental'");
  //  result.then(res => {
  //   for (let row of res.rows) {
  //     console.log(row.table_name); 
  //   }
  //   // console.log(result);
  //  })
 });

module.exports = pool;
