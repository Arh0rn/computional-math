import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Task7 = () => {
  const [xStart, setXStart] = useState(0);
  const [yStart, setYStart] = useState(1);
  const [xTarget, setXTarget] = useState(0.1);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [taylorData, setTaylorData] = useState<any[]>([]);

  // Function to compute Taylor series approximation
  const taylorSeries = (x0: number, y0: number, h: number) => {
    let y1 = y0;
    let yPrime = y0 ** 2 + x0 ** 2;
    let yDoublePrime = 2 * y0 * yPrime + 2 * x0;
    let yTriplePrime = 2 * y0 * yDoublePrime + 2 * yPrime ** 2 + 2;

    y1 += h * yPrime + (h ** 2 / 2) * yDoublePrime + (h ** 3 / 6) * yTriplePrime;

    return y1;
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = taylorSeries(xStart, yStart, xTarget - xStart);
    setEstimatedValue(result);

    // Generate data for visualization
    let data = [];
    for (let i = 0; i <= xTarget; i += 0.01) {
      data.push({ x: i, y: taylorSeries(xStart, yStart, i - xStart) });
    }
    setTaylorData(data);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 7: Taylor Series Method</h2>
      <p className="mb-6">Use Taylor Series up to the 3rd derivative to approximate \( y(x) \).</p>

      {/* Initial Conditions */}
      <div className="mb-4 flex space-x-4">
        <label className="text-lg">
          \( x_0 \):
          <input
            type="number"
            value={xStart}
            onChange={(e) => setXStart(parseFloat(e.target.value))}
            className="ml-2 border p-2 w-16"
          />
        </label>
        <label className="text-lg">
          \( y_0 \):
          <input
            type="number"
            value={yStart}
            onChange={(e) => setYStart(parseFloat(e.target.value))}
            className="ml-2 border p-2 w-16"
          />
        </label>
      </div>

      {/* Target X Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Target x-value</h3>
        <input
          type="number"
          value={xTarget}
          onChange={(e) => setXTarget(parseFloat(e.target.value))}
          className="border p-2 w-16 text-center"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Compute Approximation
      </button>

      {/* Results */}
      {estimatedValue !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Estimated Value:</p>
          <p className="text-blue-600">y({xTarget}) = {estimatedValue.toFixed(4)}</p>
        </div>
      )}

      {/* Graph Visualization */}
      {taylorData.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold">Taylor Series Approximation</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={taylorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: "x", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "y", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#FF5733" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Task7;
