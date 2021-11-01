const { Router } = require('express');
const router = Router();
const covidController = require('../controllers/covidController');

router.post('/',
    covidController.getAllComunas
);

module.exports = router;