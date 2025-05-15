const express = require('express')
const AddBatchControl=require('../controller/AddBatchController')
const router = express.Router();

router.post('/addnewbatch',AddBatchControl)

module.exports = router;
