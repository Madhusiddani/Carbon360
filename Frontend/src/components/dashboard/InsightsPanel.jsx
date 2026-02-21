export default function InsightsPanel({ insights }) {
  return (
    <div className="bg-gradient-to-br from-slate-900/60 to-teal-900/40 backdrop-blur-md rounded-3xl p-6 border border-teal-500/30 shadow-2xl h-full">
      <h2 className="text-2xl font-bold text-white mb-6">Insights</h2>
      
      <div className="space-y-4">
        {/* Recommendation */}
        <div className="bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4">
          <p className="text-teal-300 text-sm mb-1">Recommendation</p>
          <p className="text-4xl font-bold text-emerald-400">{insights.recommendation}</p>
        </div>

        {/* Break-even Year */}
        <div className="bg-slate-800/60 border border-teal-500/30 rounded-2xl p-4">
          <p className="text-teal-300 text-sm mb-1">Break-even Year</p>
          <p className="text-4xl font-bold text-white">Year {insights.breakEvenYear}</p>
        </div>

        {/* Total EV CO2 */}
        <div className="bg-slate-800/60 border border-teal-500/30 rounded-2xl p-4">
          <p className="text-teal-300 text-sm mb-1">Total EV CO₂</p>
          <p className="text-3xl font-bold text-white">{insights.totalEV.toLocaleString()} <span className="text-lg text-teal-300">kg</span></p>
        </div>

        {/* Total Petrol CO2 */}
        <div className="bg-slate-800/60 border border-teal-500/30 rounded-2xl p-4">
          <p className="text-teal-300 text-sm mb-1">Total Petrol CO₂</p>
          <p className="text-3xl font-bold text-white">{insights.totalPetrol.toLocaleString()} <span className="text-lg text-teal-300">kg</span></p>
        </div>
      </div>
    </div>
  );
}
