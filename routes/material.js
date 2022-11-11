const express = require('express');
const materialController = require('../controllers/material')

const router = express.Router();

router.post('/create/material', materialController.createMaterial)
router.get('/get/all/materials', materialController.getAllMaterials)
router.get('/get/one/material/:id', materialController.getSingleMaterial)
router.patch('/update/student/:id', materialController.updateStudents)

module.exports = router