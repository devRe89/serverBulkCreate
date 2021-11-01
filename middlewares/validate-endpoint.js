const { header, validationResult } = require('express-validator');

const validateInputs = endpoint => {
    switch(endpoint){
        case 'confirmed-cases':
            return [
                header('comuna', 'Campo requerido').not().isEmpty(),
                header('comuna', 'Campo es de tipo entero').isNumeric(),
                header('month', 'Campo requerido').not().isEmpty(),
                header('month').custom((month) => validateFormat(month)),
            ]  
        default:
            return;
    }        
}

const validateFormat = date => {
    const pattern = /^([12]\d{3}-(0[1-9]|1[0-2]))/;
    if( date.toString().match(pattern) === null ) {
        throw new Error(`El formato debe ser YYY-MM`);
    } else {
        return true;
    }
}

const showErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next();
    }

    const arrayError = [];
    errors.array().map(err => arrayError.push({ [err.param]:err.msg }));
    
    return res.status(500).json({
        errores: arrayError,
    });
}

module.exports = {
    validateInputs,
    showErrors
}