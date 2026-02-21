const { body, validationResult } = require('express-validator');
const { STATE_EMISSION_FACTORS } = require('../data/emissionFactors');

const validateAnalysis = [
    body('state')
        .notEmpty()
        .withMessage('State is required')
        .custom((value) => {
            if (!STATE_EMISSION_FACTORS[value]) {
                throw new Error('Invalid state name');
            }
            return true;
        }),

    body('dailyKM')
        .isNumeric()
        .withMessage('Daily KM must be between 1 and 1000')
        .custom((value) => {
            const num = Number(value);
            if (num <= 0 || num > 1000) {
                throw new Error('Daily KM must be between 1 and 1000');
            }
            return true;
        }),

    body('years')
        .isInt({ min: 1, max: 30 })
        .withMessage('Years must be between 1 and 30')
];

const handleValidationErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = { validateAnalysis, handleValidationErrors };
