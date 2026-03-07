const express = require('express');
const accountController = require('../controllers/accountController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', accountController.login);
router.get('/profile', authenticateToken, accountController.getProfile);

module.exports = router;
