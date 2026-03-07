const express = require('express');
const actorController = require('../controllers/actorController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken, actorController.getAll);
router.get('/search', authenticateToken, actorController.getByKeyword);
router.get('/:id', authenticateToken, actorController.getById);
router.post('/', authenticateToken, actorController.create);
router.put('/:id', authenticateToken, actorController.update);
router.delete('/:id', authenticateToken, actorController.delete);

module.exports = router;
