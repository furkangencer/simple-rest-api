const recordController = require('../../controllers/apis/record');

const express = require('express');
let router = express.Router();
router.use('/records', recordController);
module.exports = router;