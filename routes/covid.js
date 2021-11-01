const { Router } = require('express');
const router = Router();
const covidController = require('../controllers/covidController');
const { validateInputs, showErrors } = require('../middlewares/validate-endpoint');

router.post('/',
    covidController.getDataMasive
);

router.get('/', 
    validateInputs('confirmed-cases'),
    showErrors,
    covidController.getCasesByComunaAndFecha
);

module.exports = router;