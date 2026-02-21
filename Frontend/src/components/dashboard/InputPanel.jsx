import { useState } from "react";

const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry"
];

export default function InputPanel({ onGenerate }) {
  const [state, setState] = useState("Tamil Nadu");
  const [dailyKM, setDailyKM] = useState(20);
  const [years, setYears] = useState(10);

  return (
    <div className="bg-gradient-to-br from-teal-900/40 to-emerald-900/40 backdrop-blur-md rounded-3xl p-8 border border-teal-500/30 shadow-2xl">
      <div className="grid md:grid-cols-4 gap-6 items-end">
        {/* State Selector */}
        <div>
          <label className="block text-teal-300 text-sm mb-2">State</label>
          <select
            className="w-full bg-slate-900/60 text-white p-3 rounded-xl border border-teal-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            {states.map((s) => (
              <option key={s} value={s} className="bg-slate-900">
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Daily KM Input */}
        <div>
          <label className="block text-teal-300 text-sm mb-2">Daily KM</label>
          <input
            type="number"
            className="w-full bg-slate-900/60 text-white text-center text-2xl font-bold p-3 rounded-xl border border-teal-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            value={dailyKM}
            onChange={(e) => setDailyKM(e.target.value)}
            min="1"
            max="500"
          />
        </div>

        {/* Years Input */}
        <div>
          <label className="block text-teal-300 text-sm mb-2">Years</label>
          <input
            type="number"
            className="w-full bg-slate-900/60 text-white text-center text-2xl font-bold p-3 rounded-xl border border-teal-500/40 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            min="1"
            max="20"
          />
        </div>

        {/* Run Analysis Button */}
        <button
          onClick={() => onGenerate({ state, dailyKM, years })}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform transition hover:scale-105"
        >
          Run Analysis
        </button>
      </div>
    </div>
  );
}
