const { Router } = require('express');
const router = Router();
const covidController = require('../controllers/covidController');

router.get('/',
    covidController.getDataMasive
);

module.exports = router;