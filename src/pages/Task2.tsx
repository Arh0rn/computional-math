import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Task2 = () => {
  // Generate data points for f(x) = x^2 - 5 in [1.5, 3.5]
  const generateData = () => {
    return Array.from({ length: 100 }, (_, i) => {
      const x = 1.5 + (i / 100) * 2; // Scale x to [1.5,3.5]
      return { x, y: x ** 2 - 5 };
    });
  };

  const [data, setData] = useState(generateData());
  const [method, setMethod] = useState("bisection");
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [numericalRoot, setNumericalRoot] = useState<number | null>(null);
  const [iterations, setIterations] = useState<number | null>(null);
  const [relativeError, setRelativeError] = useState<number | null>(null);
  const [exactRoot] = useState(Math.sqrt(5)); // Exact root for error calculation

  // Bisection Method
  const bisectionMethod = (a: number, b: number, tolerance: number = 1e-6, maxIterations: number = 100) => {
    let fa = a ** 2 - 5;
    let fb = b ** 2 - 5;
    if (fa * fb > 0) return null; // No root in interval

    let iter = 0;
    while (iter < maxIterations) {
      let c = (a + b) / 2;
      let fc = c ** 2 - 5;
      if (Math.abs(fc) < tolerance) return { root: c, iterations: iter };

      if (fa * fc < 0) {
        b = c;
        fb = fc;
      } else {
        a = c;
        fa = fc;
      }
      iter++;
    }
    return { root: (a + b) / 2, iterations: iter };
  };

  // Secant Method
  const secantMethod = (x0: number, x1: number, tolerance: number = 1e-6, maxIterations: number = 100) => {
    let iter = 0;
    let x_prev = x0, x_next = x1;

    while (iter < maxIterations) {
      let fx_prev = x_prev ** 2 - 5;
      let fx_next = x_next ** 2 - 5;
      if (Math.abs(fx_next) < tolerance) return { root: x_next, iterations: iter };

      let x_new = x_next - fx_next * (x_next - x_prev) / (fx_next - fx_prev);
      x_prev = x_next;
      x_next = x_new;
      iter++;
    }
    return { root: x_next, iterations: iter };
  };

  // Handle Calculation
  const handleCalculate = () => {
    let result = method === "bisection" ? bisectionMethod(a, b) : secantMethod(a, b);
    if (result !== null) {
      setNumericalRoot(result.root);
      setIterations(result.iterations);
      setRelativeError(Math.abs((result.root - exactRoot) / exactRoot) * 100);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 2: Root-Finding Methods</h2>
      <p className="mb-6">Find the root of \( f(x) = x^2 - 5 \) using Bisection and Secant methods.</p>

      {/* Method Selection & Interval Inputs */}
      <div className="flex space-x-4 mb-4">
        <label className="text-lg">
          Method:
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="ml-2 border p-2 rounded"
          >
            <option value="bisection">Bisection Method</option>
            <option value="secant">Secant Method</option>
          </select>
        </label>

        {/* Interval Input */}
        <label className="text-lg">
          Interval [a, b]:
          <input
            type="number"
            value={a}
            onChange={(e) => setA(parseFloat(e.target.value))}
            className="ml-2 border p-2 rounded w-16"
          />
          <input
            type="number"
            value={b}
            onChange={(e) => setB(parseFloat(e.target.value))}
            className="ml-2 border p-2 rounded w-16"
          />
        </label>
      </div>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: "x", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: "f(x)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Calculate Root and Error
      </button>

      {/* Results */}
      {numericalRoot !== null && iterations !== null && relativeError !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Results:</p>
          <p>Numerical Root: <span className="text-blue-600 font-semibold">{numericalRoot.toFixed(6)}</span></p>
          <p>Iterations: <span className="text-purple-500 font-semibold">{iterations}</span></p>
          <p>Relative Error: <span className="text-red-500 font-semibold">{relativeError.toFixed(4)}%</span></p>
        </div>
      )}
    </div>
  );
};

export default Task2;
