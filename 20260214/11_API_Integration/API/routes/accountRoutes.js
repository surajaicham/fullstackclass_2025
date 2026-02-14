const express = require('express');
const accountController = require('../controllers/accountController.js');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/accounts', accountController.getAccount);
router.post('/login', accountController.login);
router.get('/profile', authenticateToken, accountController.getProfile);

module.exports = router;
