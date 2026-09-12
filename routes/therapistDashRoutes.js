const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const therapistDashController = require('../controllers/therapistDashController');

router.use(protect);
router.use(restrictTo('therapist'));

router.get('/dashboard', therapistDashController.getDashboard);
router.get('/clients', therapistDashController.getClients);
router.get('/clients/:id', therapistDashController.getClientDetail);

module.exports = router;
