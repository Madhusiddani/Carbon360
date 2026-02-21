export default function Navbar() {
  return (
    <nav className="flex justify-between items-center py-6 px-6 bg-white/5 backdrop-blur-sm">
      <h1 className="text-3xl font-bold text-green-400">
        🌍 CarbonWise 360
      </h1>

      <div className="space-x-6 text-slate-300">
        <button className="hover:text-green-400 transition">Dashboard</button>
        <button className="hover:text-green-400 transition">About</button>
        <button className="hover:text-green-400 transition">Data</button>
      </div>
    </nav>
  );
}
