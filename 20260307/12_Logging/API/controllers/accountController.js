const Account = require('../models/account');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "123456789abcdefg";

module.exports = {
  async login(req, res) {
    const { username, password, grant_type } = req.body;
    if (grant_type !== 'password') {
      res.status(400).json({ error: 'unsupported_grant_type' });
    }

    let user = await Account.login(username, password);
    if (user == null) {
      res.status(400).json({ error: 'invalid user name and password' });
    } else {
      const token = jwt.sign({ sub: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ access_token: token, token_type: 'bearer', username: user.username, expires_in: 3600 });
    }
  },

  async getProfile(req, res) {
    // const authHeader = req.headers['authorization'];
    // if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    // const token = authHeader.split(' ')[1];
    // jwt.verify(token, JWT_SECRET, (err, decoded) => {
    //   if (err) return res.status(401).json({ error: 'Invalid token' });

      Account.getById(decoded.sub).then(user => {
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ id: user.id, username: user.username, email: user.email });
      });
    //});
  },

};
