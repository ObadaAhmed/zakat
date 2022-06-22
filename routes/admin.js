var express = require('express');
var router = express.Router();
const controller = require('../controllers/admin');

router.post('/add' , controller.add);
router.post('/add-employee/:id' ,controller.addEmployee );
router.put('/accept-decline/:id' , controller.acceptDeclineDeserver);
router.get('/fetch-all-deservers' , controller.fethAllDeservers);
module.exports = router;
