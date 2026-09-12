
const express = require('express');
const router = express.Router();
const c = require('../controllers/moodController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/', c.logMood);
router.get('/', c.getLogs);
router.get('/trends', c.getTrends);

module.exports = router;
