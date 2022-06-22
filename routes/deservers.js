const express = require('express');
const router = express.Router();
const controller = require('../controllers/deserversController')
router.get('/checkRegistsry/:national_number' , controller.checkIfRegistred)


module.exports = router;