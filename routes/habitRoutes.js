
const express = require('express');
const router = express.Router();
const c = require('../controllers/habitController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/complete', c.completeHabit);
router.get('/', c.getLogs);
router.get('/streaks', c.getStreaks);

module.exports = router;
