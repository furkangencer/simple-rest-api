const express = require('express');
const recordService = require('../../services/records/record');
let router = express.Router();

router.post('/', recordService.getRecordsByDateAndSum);

module.exports = router;