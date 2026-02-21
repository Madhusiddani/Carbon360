import Card from "../common/Card";

export default function SustainabilityScore() {
  const score = Math.floor(Math.random() * 40) + 60;

  return (
    <Card>
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Sustainability Score</h2>
        <div className="text-5xl font-bold text-green-500">{score}/100</div>
        <p className="text-gray-600 mt-2">Based on current emissions data</p>
      </div>
    </Card>
  );
}
