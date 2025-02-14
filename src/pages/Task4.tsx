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

const Task4 = () => {
  // Default Matrix A
  const [A, setA] = useState([
    [5, -3, 2],
    [-3, 9, -1],
    [2, -1, 7],
  ]);
  const [inverseMatrix, setInverseMatrix] = useState<number[][] | null>(null);
  const [iterations, setIterations] = useState<number | null>(null);
  const [convergenceData, setConvergenceData] = useState<any[]>([]);

  // Identity matrix
  const identityMatrix = (size: number) => {
    return Array.from({ length: size }, (_, i) =>
      Array.from({ length: size }, (_, j) => (i === j ? 1 : 0))
    );
  };

  // Multiply two matrices
  const multiplyMatrices = (A: number[][], B: number[][]) => {
    return A.map((row, i) =>
      B[0].map((_, j) =>
        row.reduce((sum, elem, k) => sum + elem * B[k][j], 0)
      )
    );
  };

  // Subtract two matrices
  const subtractMatrices = (A: number[][], B: number[][]) => {
    return A.map((row, i) => row.map((val, j) => val - B[i][j]));
  };

  // Compute trace of a matrix
  const trace = (A: number[][]) => A.reduce((sum, row, i) => sum + row[i], 0);

  // Compute the inverse using the iterative method
  const iterativeMatrixInversion = (A: number[][], tol: number = 1e-6, maxIter: number = 100) => {
    const n = A.length;
    let X = identityMatrix(n).map(row => row.map(val => val / trace(A))); // Initial guess
    let iter = 0;
    let data = [];

    while (iter < maxIter) {
      const AX = multiplyMatrices(A, X);
      const twoI = identityMatrix(n).map(row => row.map(val => val * 2));
      const newX = multiplyMatrices(X, subtractMatrices(twoI, AX));

      // Compute convergence error
      const error = Math.max(
        ...newX.map((row, i) =>
          row.map((val, j) => Math.abs(val - X[i][j]))
        ).flat()
      );

      // Store convergence data
      data.push({ iter, error });

      if (error < tol) {
        setConvergenceData(data);
        return { inverse: newX, iterations: iter };
      }

      X = newX;
      iter++;
    }
    setConvergenceData(data);
    return { inverse: X, iterations: iter };
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = iterativeMatrixInversion(A);
    setInverseMatrix(result.inverse);
    setIterations(result.iterations);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 4: Iterative Matrix Inversion</h2>
      <p className="mb-6">Compute the inverse of a matrix using an iterative method.</p>

      {/* Matrix Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Matrix (A)</h3>
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

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Compute Inverse
      </button>

      {/* Results */}
      {inverseMatrix !== null && iterations !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Inverse Matrix (after {iterations} iterations):</p>
          {inverseMatrix.map((row, i) => (
            <p key={i} className="text-blue-600">
              [{row.map((x) => x.toFixed(6)).join(", ")}]
            </p>
          ))}
        </div>
      )}

      {/* Graph Visualization */}
      {convergenceData.length > 0 && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold">Convergence of Error</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={convergenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iter" label={{ value: "Iteration", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Error", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="error" stroke="#FF0000" strokeWidth={2} name="Error" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Task4;
