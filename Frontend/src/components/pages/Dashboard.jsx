import Navbar from "../layout/Navbar";
import BackgroundAnimation from "../layout/BackgroundAnimation";
import InputPanel from "../dashboard/InputPanel";
import CarbonChart from "../dashboard/CarbonChart";
import InsightsPanel from "../dashboard/InsightsPanel";
import { useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);

  const handleGenerate = (filters) => {
    // Generate 10-year projection data
    const years = [];
    let evValue = 1000;
    let petrolValue = 1000;
    
    for (let i = 1; i <= 10; i++) {
      evValue += Math.floor(Math.random() * 600) + 400;
      petrolValue += Math.floor(Math.random() * 400) + 300;
      years.push({
        year: `Year ${i}`,
        EV: evValue,
        Petrol: petrolValue
      });
    }

    // Calculate insights
    const totalEV = years[9].EV;
    const totalPetrol = years[9].Petrol;
    const breakEvenYear = Math.floor(Math.random() * 3) + 3;
    const recommendation = totalEV < totalPetrol ? "EV" : "Petrol";

    setData({ 
      filters, 
      chart: years,
      insights: {
        recommendation,
        breakEvenYear,
        totalEV,
        totalPetrol
      }
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-teal-950 to-emerald-950">
      <BackgroundAnimation />
      
      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-3">
            CarbonWise <span className="text-emerald-400">360</span>
          </h1>
          <p className="text-teal-300 text-xl">Intelligent EV vs Petrol Carbon Analysis</p>
        </div>

        {/* Input Panel */}
        <InputPanel onGenerate={handleGenerate} />

        {/* Results */}
        {data && (
          <div className="grid lg:grid-cols-3 gap-6 mt-8">
            <div className="lg:col-span-2">
              <CarbonChart data={data.chart} />
            </div>
            <div>
              <InsightsPanel insights={data.insights} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
