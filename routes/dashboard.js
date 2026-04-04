const express = require('express');
const  getSummary  = require('../controllers/dashboard');
const { protect } = require('../middleware/auth');
const router = express.Router();
router.use(protect);
router.route('/summary').get(getSummary);


module.exports = router;