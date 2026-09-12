const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const therapistController = require('../controllers/therapistController');

router.use(protect);
router.use(restrictTo('therapist'));

router.post('/apply', therapistController.apply);
router.get('/status', therapistController.getAppStatus);

module.exports = router;
