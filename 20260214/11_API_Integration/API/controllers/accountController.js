const Account = require('../models/account.js');
const jwt = require('jsonwebtoken');
const secret = "123456789abcdefg"; 

module.exports = {
    async getAccount(req, res) {
        const accounts = await Account.getAccount();
        res.json(accounts);
    },
    async getProfile(req, res) {
      Account.getById(req.user.sub).then(user => {
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json({ id: user.id, username: user.username, email: user.email });
      });
    },
    async login(req, res) {
        const {username, password, grant_type} = req.body;

        if (grant_type !== 'password') {
            return res.status(400).json({ error: 'Unsupported grant type' });
        }

        let user = await Account.login(username, password);
        if(user == null) {
            res.status(400).json({ error: 'Invalid username or password' });
        } else {
            const token = jwt.sign( { 
                                        sub: user.id, username: user.username 
                                    }
                                    , secret
                                    , { expiresIn: '1h' }
                                );
            res.json({ access_token: token
                        , token_type: 'bearer'
                        , username: user.username
                        , expires_in: 3600
                    });
        }
    }
};