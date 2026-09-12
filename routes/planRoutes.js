
const express = require('express');
const router = express.Router();
const c = require('../controllers/planController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/generate', c.generate);
router.get('/current', c.getCurrent);
router.put('/:id/task/:taskIndex', c.markTask);
router.put('/:id/adjust', c.adjust);
router.get('/history', c.getHistory);

module.exports = router;
