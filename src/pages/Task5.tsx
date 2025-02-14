import { useState } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";

const Task5 = () => {
  // Default Data Points
  const [points, setPoints] = useState([
    { x: 1, y: 5 },
    { x: 2, y: 8 },
    { x: 3, y: 12 },
    { x: 4, y: 15 },
    { x: 5, y: 20 },
  ]);
  const [lineEquation, setLineEquation] = useState<{ a: number; b: number } | null>(null);
  const [fittedLine, setFittedLine] = useState<any[]>([]);

  // Function to calculate Least Squares Regression
  const leastSquaresFit = (data: { x: number; y: number }[]) => {
    const n = data.length;
    const sumX = data.reduce((sum, p) => sum + p.x, 0);
    const sumY = data.reduce((sum, p) => sum + p.y, 0);
    const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0);

    // Compute coefficients a and b
    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - a * sumX) / n;

    // Compute fitted line points
    const fittedData = data.map((p) => ({ x: p.x, y: a * p.x + b }));

    return { a, b, fittedData };
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = leastSquaresFit(points);
    setLineEquation({ a: result.a, b: result.b });
    setFittedLine(result.fittedData);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 5: Linear Curve Fitting</h2>
      <p className="mb-6">Fit a line to data points using the Least Squares Method.</p>

      {/* Data Points Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Data Points (x, y)</h3>
        {points.map((point, i) => (
          <div key={i} className="flex space-x-2">
            <input
              type="number"
              value={point.x}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[i].x = parseFloat(e.target.value);
                setPoints(newPoints);
              }}
              className="border p-2 w-16 text-center"
            />
            <input
              type="number"
              value={point.y}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[i].y = parseFloat(e.target.value);
                setPoints(newPoints);
              }}
              className="border p-2 w-16 text-center"
            />
          </div>
        ))}
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Compute Best-Fit Line
      </button>

      {/* Results */}
      {lineEquation !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Best-Fit Line Equation:</p>
          <p className="text-blue-600">
            y = {lineEquation.a.toFixed(4)}x + {lineEquation.b.toFixed(4)}
          </p>
        </div>
      )}

      {/* Graph Visualization */}
      {fittedLine.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold">Data Points and Best-Fit Line</h3>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Data Points" data={points} fill="red" />
              <Line type="linear" dataKey="y" data={fittedLine} stroke="blue" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Task5;
