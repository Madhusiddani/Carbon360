const { STATE_EMISSION_FACTORS, CONSTANTS } = require('../data/emissionFactors');

const calculateEmissions = (state, dailyKM, years) => {
    const gridFactor = STATE_EMISSION_FACTORS[state];

    const evAnnual = dailyKM * 365 * CONSTANTS.EV_CONSUMPTION * gridFactor;
    const petrolAnnual =
        (dailyKM / CONSTANTS.PETROL_CAR_MILEAGE) * 365 * CONSTANTS.PETROL_EMISSION_FACTOR;

    let cumulativeEV = 0;
    let cumulativePetrol = 0;
    let breakEvenYear = null;
    const chart = [];

    for (let year = 1; year <= years; year++) {
        cumulativeEV += evAnnual;
        cumulativePetrol += petrolAnnual;

        // Year 1 only: add manufacturing emissions
        if (year === 1) {
            cumulativeEV += CONSTANTS.EV_MANUFACTURING_EMISSION;
            cumulativePetrol += CONSTANTS.PETROL_MANUFACTURING_EMISSION;
        }

        if (cumulativeEV < cumulativePetrol && breakEvenYear === null) {
            breakEvenYear = year;
        }

        chart.push({
            year: 'Year ' + year,
            EV: Math.round(cumulativeEV),
            Petrol: Math.round(cumulativePetrol)
        });
    }

    const totalEV = chart[chart.length - 1].EV;
    const totalPetrol = chart[chart.length - 1].Petrol;
    const recommendation = totalEV < totalPetrol ? 'EV' : 'Petrol';

    return {
        chart,
        insights: { recommendation, breakEvenYear, totalEV, totalPetrol }
    };
};

module.exports = calculateEmissions;
