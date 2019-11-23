const express = require('express');
const recordService = require('../../services/records/record');
let router = express.Router();

// Registers the service function which handles the requests and do some stuff on database
router.post('/', recordService.getRecordsByDateAndSum);

module.exports = router;