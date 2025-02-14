import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { evaluate } from "mathjs";

const Task1 = () => {
  // Generate data points for f(x) = cos(x) - x in [0,1]
  const generateData = () => {
    return Array.from({ length: 100 }, (_, i) => {
      const x = (i / 100) * 1; // Scale x to [0,1]
      return { x, y: Math.cos(x) - x };
    });
  };

  const [data, setData] = useState(generateData());
  const [method, setMethod] = useState("newton"); // Default: Newton-Raphson
  const [initialGuess, setInitialGuess] = useState(0.5);
  const [numericalRoot, setNumericalRoot] = useState<number | null>(null);
  const [absoluteError, setAbsoluteError] = useState<number | null>(null);
  const [visualRoot] = useState(0.739); // Approximate root from graph

  // Newton-Raphson method
  const newtonRaphsonMethod = (guess: number, tolerance: number = 1e-6, maxIterations: number = 100) => {
    let x = guess;
    for (let i = 0; i < maxIterations; i++) {
      const fx = Math.cos(x) - x;
      const dfx = -Math.sin(x) - 1; // Derivative of f(x) = -sin(x) - 1
      if (Math.abs(fx) < tolerance) return x; // Root found within tolerance
      x = x - fx / dfx;
    }
    return x;
  };

  // Bisection method
  const bisectionMethod = (a: number, b: number, tolerance: number = 1e-6, maxIterations: number = 100) => {
    let fa = Math.cos(a) - a;
    let fb = Math.cos(b) - b;
    if (fa * fb > 0) return null; // No root in interval

    for (let i = 0; i < maxIterations; i++) {
      const c = (a + b) / 2;
      const fc = Math.cos(c) - c;
      if (Math.abs(fc) < tolerance) return c;
      if (fa * fc < 0) {
        b = c;
        fb = fc;
      } else {
        a = c;
        fa = fc;
      }
    }
    return (a + b) / 2;
  };

  // Handle calculation
  const handleCalculate = () => {
    let root = method === "newton" ? newtonRaphsonMethod(initialGuess) : bisectionMethod(0, 1);
    if (root !== null) {
      setNumericalRoot(root);
      setAbsoluteError(Math.abs(root - visualRoot));
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 1: Graphical Method and Absolute Error</h2>
      <p className="mb-6">Plot the function f(x) = cos(x) - x and find its root.</p>

      {/* Method Selection */}
      <div className="flex space-x-4 mb-4">
        <label className="text-lg">
          Root-Finding Method:
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="ml-2 border p-2 rounded"
          >
            <option value="newton">Newton-Raphson</option>
            <option value="bisection">Bisection Method</option>
          </select>
        </label>

        {method === "newton" && (
          <label className="text-lg">
            Initial Guess:
            <input
              type="number"
              value={initialGuess}
              onChange={(e) => setInitialGuess(parseFloat(e.target.value))}
              className="ml-2 border p-2 rounded w-16"
            />
          </label>
        )}
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
      {numericalRoot !== null && absoluteError !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Results:</p>
          <p>Numerical Root: <span className="text-blue-600 font-semibold">{numericalRoot.toFixed(6)}</span></p>
          <p>Absolute Error: <span className="text-red-500 font-semibold">{absoluteError.toExponential(3)}</span></p>
        </div>
      )}
    </div>
  );
};

export default Task1;
