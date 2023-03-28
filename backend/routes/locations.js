const express = require('express');
const { uploadLocation } = require('../controllers/locations');

const router = express.Router();

router.post('/store-location', uploadLocation);

module.exports = router;