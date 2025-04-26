const express = require('express');
const { body } = require('express-validator');
const clientController = require('../controllers/clientController');

const router = express.Router();

// Register client
router.post(
  '/register',
  [
    body('name').notEmpty(),
    body('age').isInt({ min: 0 }),
    body('gender').notEmpty(),
    body('contactInfo').notEmpty(),
    body('clientId').notEmpty()
  ],
  clientController.registerClient
);

// Enroll client
router.post('/enroll', clientController.enrollClient);

// Search client
router.get('/search', clientController.searchClient);

// View client profile
router.get('/:clientId', clientController.getClientProfile);

module.exports = router;
