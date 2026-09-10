
const express = require('express');
const router = express.Router();
const c = require('../controllers/journalController');
const { protect, ownershipCheck } = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

router.use(protect);
router.post('/', c.create);
router.get('/', c.getAll);
router.get('/:id', ownershipCheck(JournalEntry, 'id'), c.getOne);
router.put('/:id', ownershipCheck(JournalEntry, 'id'), c.update);
router.delete('/:id', ownershipCheck(JournalEntry, 'id'), c.delete);

module.exports = router;
