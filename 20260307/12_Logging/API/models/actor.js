const pool = require('../config/db.js');

module.exports = {
  async getAll() {
    const res = await pool.query('SELECT * FROM actor');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM actor WHERE actor_id = $1', [id]);
    return res.rows[0];
  },
  async getByKeyword(keyword) {
    const res = await pool.query(
      'SELECT * FROM actor WHERE first_name ILIKE $1 OR last_name ILIKE $1',
      [`%${keyword}%`]
    );
    return res.rows;
  },
  async create(data) {
    const { first_name, last_name } = data;

    const res = await pool.query(
      'INSERT INTO actor (first_name, last_name, last_update) VALUES ($1, $2, $3) RETURNING *',
      [first_name, last_name, new Date()]
    );
    return res.rows[0];
  },
  async update(data) {
    const { actor_id, first_name, last_name } = data;
    const res = await pool.query(
      'UPDATE actor SET first_name = $1, last_name = $2, last_update = $3 WHERE actor_id = $4 RETURNING *',
      [first_name, last_name, new Date(), actor_id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM actor WHERE actor_id = $1', [id]);
    return { message: 'Actor deleted' };
  },
};


