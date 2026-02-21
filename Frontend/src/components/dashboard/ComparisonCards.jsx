import Card from "../common/Card";

export default function ComparisonCards() {
  const comparisons = [
    { label: "vs Last Year", value: "-12%", positive: true },
    { label: "vs National Avg", value: "+8%", positive: false },
    { label: "Target Progress", value: "67%", positive: true },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {comparisons.map((item, idx) => (
        <Card key={idx}>
          <div className="p-4">
            <p className="text-gray-400 text-sm">{item.label}</p>
            <p
              className={`text-2xl font-bold ${
                item.positive ? "text-green-400" : "text-red-400"
              }`}
            >
              {item.value}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
