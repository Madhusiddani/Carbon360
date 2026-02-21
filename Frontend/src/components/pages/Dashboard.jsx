import BackgroundAnimation from "../layout/BackgroundAnimation";
import InputPanel from "../dashboard/InputPanel";
import CarbonChart from "../dashboard/CarbonChart";
import InsightsPanel from "../dashboard/InsightsPanel";
import Loader from "../common/Loader";
import { useState } from "react";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [analysisId, setAnalysisId] = useState(null);
  const [pdfLoading, setPdfLoading] = useState(false);

  const handleGenerate = async (filters) => {
    const { state, dailyKM, years } = filters;

    setLoading(true);
    setError(null);
    setAnalysisId(null);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/carbon/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state, dailyKM: Number(dailyKM), years: Number(years) })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Analysis failed");
      }

      const result = await res.json();
      setData({ filters, chart: result.chart, insights: result.insights });
      setAnalysisId(result.id);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    if (!analysisId) return;
    setPdfLoading(true);
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/carbon/export/${analysisId}`
      );
      if (!res.ok) throw new Error("Failed to generate PDF");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `carbonwise-report-${analysisId}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err.message || "PDF export failed. Please try again.");
    } finally {
      setPdfLoading(false);
    }
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

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-lg bg-red-900/50 border border-red-500 text-red-300 text-center">
            {error}
          </div>
        )}

        {/* Loader */}
        {loading && <Loader />}

        {/* Results */}
        {!loading && data && (
          <>
            {/* Export PDF Button */}
            <div className="flex justify-end mt-6">
              <button
                id="export-pdf-btn"
                onClick={handleExportPDF}
                disabled={pdfLoading}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-emerald-900/40"
              >
                {pdfLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    Generating PDF…
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" />
                    </svg>
                    Download PDF Report
                  </>
                )}
              </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mt-4">
              <div className="lg:col-span-2">
                <CarbonChart data={data.chart} />
              </div>
              <div>
                <InsightsPanel insights={data.insights} />
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
