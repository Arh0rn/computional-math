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

const Task3 = () => {
  // Default system of equations
  const [A, setA] = useState([
    [1, 1, 1],
    [0, 2, 5],
    [2, 3, 1],
  ]);
  const [B, setB] = useState([6, -4, 27]);
  const [initialGuess, setInitialGuess] = useState([0, 0, 0]);
  const [solution, setSolution] = useState<number[] | null>(null);
  const [iterations, setIterations] = useState<number | null>(null);
  const [convergenceData, setConvergenceData] = useState<any[]>([]);

  // Jacobi Method Implementation
  const jacobiMethod = (A: number[][], B: number[], x0: number[], tol: number = 1e-6, maxIter: number = 100) => {
    const n = B.length;
    let x = [...x0];
    let xNew = new Array(n).fill(0);
    let iter = 0;
    let data = [];

    while (iter < maxIter) {
      for (let i = 0; i < n; i++) {
        let sum = B[i];
        for (let j = 0; j < n; j++) {
          if (i !== j) sum -= A[i][j] * x[j];
        }
        xNew[i] = sum / A[i][i];
      }

      // Save iteration data for graphing
      data.push({ iter, x1: xNew[0], x2: xNew[1], x3: xNew[2] });

      // Convergence check
      const error = Math.max(...xNew.map((xi, i) => Math.abs(x[i] - xi)));
      if (error < tol) {
        setConvergenceData(data);
        return { solution: xNew, iterations: iter };
      }

      x = [...xNew];
      iter++;
    }
    setConvergenceData(data);
    return { solution: xNew, iterations: iter };
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = jacobiMethod(A, B, initialGuess);
    setSolution(result.solution);
    setIterations(result.iterations);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 3: Jacobi Method</h2>
      <p className="mb-6">Solve the system of equations using the Jacobi Iterative Method.</p>

      {/* Coefficient Matrix Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Coefficient Matrix (A)</h3>
        {A.map((row, i) => (
          <div key={i} className="flex space-x-2">
            {row.map((val, j) => (
              <input
                key={j}
                type="number"
                value={A[i][j]}
                onChange={(e) => {
                  const newA = [...A];
                  newA[i][j] = parseFloat(e.target.value);
                  setA(newA);
                }}
                className="border p-2 w-16 text-center"
              />
            ))}
          </div>
        ))}
      </div>

      {/* Constants Vector Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Constants (B)</h3>
        <div className="flex space-x-2">
          {B.map((val, i) => (
            <input
              key={i}
              type="number"
              value={B[i]}
              onChange={(e) => {
                const newB = [...B];
                newB[i] = parseFloat(e.target.value);
                setB(newB);
              }}
              className="border p-2 w-16 text-center"
            />
          ))}
        </div>
      </div>

      {/* Initial Guess Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Initial Guess (x₀)</h3>
        <div className="flex space-x-2">
          {initialGuess.map((val, i) => (
            <input
              key={i}
              type="number"
              value={initialGuess[i]}
              onChange={(e) => {
                const newGuess = [...initialGuess];
                newGuess[i] = parseFloat(e.target.value);
                setInitialGuess(newGuess);
              }}
              className="border p-2 w-16 text-center"
            />
          ))}
        </div>
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Solve System
      </button>

      {/* Results */}
      {solution !== null && iterations !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Solution (after {iterations} iterations):</p>
          <p>X = [{solution.map((x) => x.toFixed(6)).join(", ")}]</p>
        </div>
      )}

      {/* Graph Visualization */}
      {convergenceData.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold">Convergence of Variables</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={convergenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iter" label={{ value: "Iteration", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Value", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="x1" stroke="#FF0000" strokeWidth={2} name="x1" />
              <Line type="monotone" dataKey="x2" stroke="#00FF00" strokeWidth={2} name="x2" />
              <Line type="monotone" dataKey="x3" stroke="#0000FF" strokeWidth={2} name="x3" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Task3;
