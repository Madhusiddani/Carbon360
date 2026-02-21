const express = require('express');
const router = express.Router();

const { validateAnalysis, handleValidationErrors } = require('../middleware/validate');
const calculateEmissions = require('../services/carbonCalculator');
const Analysis = require('../models/Analysis');
const { STATE_EMISSION_FACTORS } = require('../data/emissionFactors');

// POST /api/carbon/analyze
router.post('/analyze', validateAnalysis, handleValidationErrors, async (req, res) => {
    try {
        const { state, dailyKM, years } = req.body;

        const { chart, insights } = calculateEmissions(state, dailyKM, years);

        const saved = await new Analysis({ state, dailyKM, years, chart, insights }).save();

        res.status(200).json({ chart, insights, id: saved._id });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/carbon/states
router.get('/states', (req, res) => {
    res.json({ states: Object.keys(STATE_EMISSION_FACTORS) });
});

// GET /api/carbon/history
router.get('/history', async (req, res) => {
    try {
        const history = await Analysis.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select('state dailyKM years insights createdAt');
        res.json(history);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});

// GET /api/carbon/health
router.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

module.exports = router;
