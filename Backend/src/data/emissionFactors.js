const STATE_EMISSION_FACTORS = {
    "Andhra Pradesh": 0.82,
    "Arunachal Pradesh": 0.10,
    "Assam": 0.65,
    "Bihar": 0.95,
    "Chhattisgarh": 1.05,
    "Goa": 0.72,
    "Gujarat": 0.88,
    "Haryana": 0.90,
    "Himachal Pradesh": 0.08,
    "Jharkhand": 1.02,
    "Karnataka": 0.55,
    "Kerala": 0.35,
    "Madhya Pradesh": 0.98,
    "Maharashtra": 0.82,
    "Manipur": 0.20,
    "Meghalaya": 0.25,
    "Mizoram": 0.15,
    "Nagaland": 0.18,
    "Odisha": 0.95,
    "Punjab": 0.75,
    "Rajasthan": 0.92,
    "Sikkim": 0.10,
    "Tamil Nadu": 0.76,
    "Telangana": 0.88,
    "Tripura": 0.60,
    "Uttar Pradesh": 0.95,
    "Uttarakhand": 0.12,
    "West Bengal": 0.90,
    "Andaman and Nicobar Islands": 0.80,
    "Chandigarh": 0.78,
    "Dadra and Nagar Haveli and Daman and Diu": 0.75,
    "Delhi": 0.82,
    "Jammu and Kashmir": 0.25,
    "Ladakh": 0.10,
    "Lakshadweep": 0.85,
    "Puducherry": 0.72
};

// Calculation constants
const CONSTANTS = {
    PETROL_EMISSION_FACTOR: 2.31,         
    PETROL_CAR_MILEAGE: 15,               
    EV_CONSUMPTION: 0.15,                 
    EV_MANUFACTURING_EMISSION: 8500,      
    PETROL_MANUFACTURING_EMISSION: 6000   
};

module.exports = { STATE_EMISSION_FACTORS, CONSTANTS };
