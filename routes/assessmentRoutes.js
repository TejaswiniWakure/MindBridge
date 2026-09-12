
const express = require('express');
const router = express.Router();
const c = require('../controllers/assessmentController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/', c.getAll);
router.get('/results', c.getResults);
router.get('/snapshot', c.getSnapshot);
router.get('/results/:id', c.getResult);
router.get('/:assessmentId', c.getOne);
router.post('/submit', c.submit);

module.exports = router;
