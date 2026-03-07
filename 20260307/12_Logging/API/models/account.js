const crypto = require('crypto');
const pool = require('../config/db.js');


module.exports = {
  async getAll() {
    const res = await pool.query('SELECT * FROM account');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM account WHERE id = $1', [id]);
    return res.rows[0];
  },
  async login(username, password) {
    var hash = crypto.createHash('md5').update(password).digest('hex');
    console.log(hash);
    const res = await pool.query('SELECT * FROM account WHERE username = $1 and password = $2', [username, hash]);

    if(res && res.rows && res.rows.length > 0){
      return res.rows[0];
    }
    return null;
  },
};

