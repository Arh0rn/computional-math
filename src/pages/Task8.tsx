import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { evaluate } from "mathjs";

const Task8 = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(1);
  const [n, setN] = useState(4);
  const [approxIntegral, setApproxIntegral] = useState<number | null>(null);
  const [exactIntegral, setExactIntegral] = useState<number | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [plotData, setPlotData] = useState<any[]>([]);

  // Function to compute f(x) = x^2 + x
  const f = (x: number) => x ** 2 + x;

  // Function to compute exact integral using symbolic integration
  const computeExactIntegral = (a: number, b: number) => {
    const exactValue = (b ** 3) / 3 + (b ** 2) / 2 - ((a ** 3) / 3 + (a ** 2) / 2);
    return exactValue;
  };

  // Function to apply the Trapezoidal Rule
  const trapezoidalRule = (a: number, b: number, n: number) => {
    const h = (b - a) / n;
    let sum = f(a) + f(b);

    for (let i = 1; i < n; i++) {
      sum += 2 * f(a + i * h);
    }

    const integral = (h / 2) * sum;
    return integral;
  };

  // Handle Calculation
  const handleCalculate = () => {
    const approxValue = trapezoidalRule(a, b, n);
    const exactValue = computeExactIntegral(a, b);
    const errorValue = Math.abs(approxValue - exactValue);

    setApproxIntegral(approxValue);
    setExactIntegral(exactValue);
    setError(errorValue);

    // Generate plot data
    let data = [];
    for (let i = 0; i <= n; i++) {
      const x = a + (i * (b - a)) / n;
      data.push({ x, y: f(x) });
    }
    setPlotData(data);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 8: Trapezoidal Rule</h2>
      <p className="mb-6">Approximate \( \int_a^b (x^2 + x)dx \) using the Trapezoidal Rule.</p>

      {/* Inputs */}
      <div className="flex space-x-4 mb-4">
        <label className="text-lg">
          Lower Limit (a):
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="ml-2 border p-2 w-16"
          />
        </label>
        <label className="text-lg">
          Upper Limit (b):
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="ml-2 border p-2 w-16"
          />
        </label>
        <label className="text-lg">
          Subintervals (n):
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            className="ml-2 border p-2 w-16"
          />
        </label>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Compute Integral
      </button>

      {/* Results */}
      {approxIntegral !== null && exactIntegral !== null && error !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Results:</p>
          <p>Approximate Integral: <span className="text-blue-600 font-semibold">{approxIntegral.toFixed(6)}</span></p>
          <p>Exact Integral: <span className="text-green-600 font-semibold">{exactIntegral.toFixed(6)}</span></p>
          <p>Absolute Error: <span className="text-red-500 font-semibold">{error.toExponential(3)}</span></p>
        </div>
      )}

      {/* Graph Visualization */}
      {plotData.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold">Function & Trapezoidal Approximation</h3>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={plotData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: "x", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "f(x)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Area type="monotone" dataKey="y" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Task8;
