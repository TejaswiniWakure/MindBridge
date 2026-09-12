const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.use(protect);
router.use(restrictTo('admin'));

router.get('/dashboard', adminController.getDashboardStats);
router.get('/therapists/pending', adminController.getPendingTherapists);
router.put('/therapists/:id/status', adminController.updateTherapistStatus);

module.exports = router;
