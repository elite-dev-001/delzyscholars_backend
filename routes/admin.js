const express = require('express');
const adminController = require('../controllers/admin');
const ensureToken = require('../token')


const router = express.Router();

router.post('/create/admin', adminController.createAdmin);
router.get('/get/one/:id', adminController.getOneAdmin)
router.get('/get/all', ensureToken, adminController.getAllAdmins)


module.exports = router;