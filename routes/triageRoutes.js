
const express = require('express');
const router = express.Router();
const c = require('../controllers/triageController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.post('/submit', c.submit);
router.get('/result', c.getResult);

module.exports = router;
