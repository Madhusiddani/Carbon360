const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
    state: {
        type: String,
        required: true
    },
    dailyKM: {
        type: Number,
        required: true
    },
    years: {
        type: Number,
        required: true
    },
    chart: [
        {
            year: String,
            EV: Number,
            Petrol: Number
        }
    ],
    insights: {
        recommendation: String,   // "EV" or "Petrol"
        breakEvenYear: Number,    // nullable — null if EV never wins
        totalEV: Number,
        totalPetrol: Number
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Analysis', AnalysisSchema);
