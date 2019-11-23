const recordController = require('../../controllers/apis/record');

const express = require('express');
let router = express.Router();

// Registers controller for /records
router.use('/records', recordController);
module.exports = router;