const express = require('express');
const router = express.Router();
const PDFDocument = require('pdfkit');

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

// GET /api/carbon/export/:id
router.get('/export/:id', async (req, res) => {
    try {
        const analysis = await Analysis.findById(req.params.id);
        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }

        const doc = new PDFDocument({ margin: 50 });

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader(
            'Content-Disposition',
            `attachment; filename="carbonwise-report-${req.params.id}.pdf"`
        );
        doc.pipe(res);

        // ── Header ──────────────────────────────────────────────
        doc
            .fontSize(24)
            .fillColor('#10b981')
            .text('CarbonWise 360 — Emission Report', { align: 'center' });

        doc
            .moveDown(0.5)
            .fontSize(10)
            .fillColor('#64748b')
            .text(`Generated: ${new Date().toLocaleString('en-IN')}`, { align: 'center' });

        doc.moveDown(1).moveTo(50, doc.y).lineTo(560, doc.y).strokeColor('#10b981').stroke();

        // ── Analysis Summary ────────────────────────────────────
        doc.moveDown(1).fontSize(14).fillColor('#1e293b').text('Analysis Summary', { underline: true });
        doc.moveDown(0.5).fontSize(11).fillColor('#334155');

        const summaryRows = [
            ['State', analysis.state],
            ['Daily Distance', `${analysis.dailyKM} km/day`],
            ['Projection Period', `${analysis.years} years`],
        ];
        summaryRows.forEach(([label, value]) => {
            doc.text(`${label}: `, { continued: true }).fillColor('#0f172a').text(value);
            doc.fillColor('#334155');
        });

        // ── Insights ────────────────────────────────────────────
        doc.moveDown(1).fontSize(14).fillColor('#1e293b').text('Key Insights', { underline: true });
        doc.moveDown(0.5).fontSize(11).fillColor('#334155');

        const { recommendation, breakEvenYear, totalEV, totalPetrol } = analysis.insights;
        const insightRows = [
            ['Recommendation', recommendation],
            ['Break-Even Year', breakEvenYear ? `Year ${breakEvenYear}` : 'EV does not break even within this period'],
            ['Total EV Emissions', `${totalEV.toLocaleString()} kg CO₂`],
            ['Total Petrol Emissions', `${totalPetrol.toLocaleString()} kg CO₂`],
            ['CO₂ Saved by EV', `${Math.max(0, totalPetrol - totalEV).toLocaleString()} kg CO₂`],
        ];
        insightRows.forEach(([label, value]) => {
            doc.text(`${label}: `, { continued: true }).fillColor('#0f172a').text(value);
            doc.fillColor('#334155');
        });

        // ── Year-by-Year Chart Data ──────────────────────────────
        doc.moveDown(1).fontSize(14).fillColor('#1e293b').text('Year-by-Year Cumulative Emissions (kg CO₂)', { underline: true });
        doc.moveDown(0.5);

        // Table header
        const tableTop = doc.y;
        const col = { year: 50, ev: 200, petrol: 340, diff: 460 };

        doc.fontSize(10).fillColor('#ffffff');
        doc.rect(45, tableTop - 5, 520, 20).fill('#10b981').stroke();
        doc.fillColor('#ffffff')
            .text('Year', col.year, tableTop, { width: 130 })
            .text('EV (kg)', col.ev, tableTop, { width: 130 })
            .text('Petrol (kg)', col.petrol, tableTop, { width: 110 })
            .text('Difference', col.diff, tableTop, { width: 100 });

        // Table rows
        analysis.chart.forEach((row, i) => {
            const y = tableTop + 20 + i * 18;
            const bg = i % 2 === 0 ? '#f0fdf4' : '#ffffff';
            doc.rect(45, y - 3, 520, 18).fill(bg).stroke();
            const diff = row.Petrol - row.EV;
            doc.fillColor('#0f172a').fontSize(9)
                .text(row.year, col.year, y, { width: 130 })
                .text(row.EV.toLocaleString(), col.ev, y, { width: 130 })
                .text(row.Petrol.toLocaleString(), col.petrol, y, { width: 110 })
                .fillColor(diff >= 0 ? '#16a34a' : '#dc2626')
                .text((diff >= 0 ? '+' : '') + diff.toLocaleString(), col.diff, y, { width: 100 });
        });

        // ── Footer ──────────────────────────────────────────────
        doc.moveDown(3)
            .fontSize(9)
            .fillColor('#94a3b8')
            .text('Generated by CarbonWise 360 • Data based on CEA India grid emission factors', { align: 'center' });

        doc.end();
    } catch (err) {
        if (!res.headersSent) {
            res.status(500).json({ message: 'Server error', error: err.message });
        }
    }
});

module.exports = router;
