import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

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
    setConvergenceData([]); // Reset previous convergence data
    const result = iterativeMatrixInversion(A);
    setInverseMatrix(result.inverse);
    setIterations(result.iterations);
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 4: Iterative Matrix Inversion
      </Typography>

      {/* Math Formula Display */}
      <BlockMath math="A = \begin{bmatrix} 5 & -3 & 2 \\ -3 & 9 & -1 \\ 2 & -1 & 7 \end{bmatrix}" />

      {/* Matrix Input */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Enter Matrix (A)
      </Typography>
      {A.map((row, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 1 }}>
          {row.map((val, j) => (
            <TextField
              key={j}
              type="number"
              value={A[i][j]}
              onChange={(e) => {
                const newA = [...A];
                newA[i][j] = parseFloat(e.target.value);
                setA(newA);
              }}
              sx={{ width: 80 }}
            />
          ))}
        </Box>
      ))}

      {/* Calculate Button */}
      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 3 }}>
        Compute Inverse
      </Button>

      {/* Results */}
      {inverseMatrix !== null && iterations !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Inverse Matrix (after {iterations} iterations):</Typography>
            {inverseMatrix.map((row, i) => (
              <Typography key={i} sx={{ fontFamily: "monospace", fontSize: "16px" }}>
                [{row.map((x) => x.toFixed(6)).join(", ")}]
              </Typography>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Graph Visualization */}
      {convergenceData.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Convergence of Error</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={convergenceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="iter" label={{ value: "Iteration", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Error", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="error" stroke="#FF0000" strokeWidth={2} name="Error" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Task4;
