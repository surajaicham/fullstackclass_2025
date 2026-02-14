const pool = require('../config/db.js');
const crypto = require('crypto');

module.exports = {
    async getAccount() {
        const result = await pool.query('SELECT * FROM account');
        return result.rows;
    },
    async getById(id) {
        const res = await pool.query('SELECT * FROM account WHERE id = $1', [id]);
        return res.rows[0];
    },
    async login(username, password) {
        var passwordHash = crypto.createHash('md5').update(password).digest('hex');
        console.log('Password Hash:', passwordHash);
        
        const result = await
            pool.query('SELECT * FROM account WHERE username = $1 AND password = $2', [username, passwordHash]);
        if (result.rows.length > 0) {
            return result.rows[0];
        } else {
            return null;
        }
    }
};
