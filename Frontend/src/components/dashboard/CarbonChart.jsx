import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";

export default function CarbonChart({ data }) {
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-slate-900/60 to-teal-900/40 backdrop-blur-md rounded-3xl p-6 border border-teal-500/30 shadow-2xl">
      <h2 className="text-2xl font-bold text-white mb-6">10-Year Carbon Projection</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e3a3a" />
            <XAxis 
              dataKey="year" 
              stroke="#5eead4" 
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#5eead4" 
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0f172a', 
                border: '1px solid #14b8a6',
                borderRadius: '8px',
                color: '#fff'
              }}
            />
            <Legend 
              wrapperStyle={{ color: '#fff' }}
            />
            <Line 
              type="monotone" 
              dataKey="EV" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line 
              type="monotone" 
              dataKey="Petrol" 
              stroke="#ef4444" 
              strokeWidth={3}
              dot={{ fill: '#ef4444', r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
