const express = require('express')
const pinController = require('../controllers/pin')

const router = express.Router();

router.patch('/use/pin', pinController.checkPin)

module.exports = router