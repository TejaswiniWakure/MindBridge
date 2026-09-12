
const express = require('express');
const router = express.Router();
const c = require('../controllers/onboardingController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.put('/profile', c.updateProfile);
router.put('/goals', c.updateGoals);
router.put('/preferences', c.updatePreferences);
router.post('/consent', c.saveConsent);
router.get('/status', c.getStatus);
router.put('/complete', c.complete);

module.exports = router;
