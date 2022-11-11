const express = require('express');
const userController = require('../controllers/user');
const ensureToken = require('../token')


const router = express.Router();

router.post('/create/user', userController.createUser);
router.post('/verify/user', userController.verifyUser)
router.get('/get/one/:id', userController.getOneUser)
router.get('/get/all', ensureToken, userController.getAllUsers)
router.patch('/update/courses/:id', userController.updateCourses)


module.exports = router;