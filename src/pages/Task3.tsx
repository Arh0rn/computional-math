import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

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
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 3: Jacobi Method
      </Typography>

      {/* Math Formula Display */}
      <BlockMath math="\begin{cases} x + y + z = 6 \\ 0y + 2z = -4 \\ 2x + 3y + z = 27 \end{cases}" />

      {/* Coefficient Matrix Input */}
      <Typography variant="h6" sx={{ mt: 3 }}>Coefficient Matrix (A)</Typography>
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

      {/* Constants Vector Input */}
      <Typography variant="h6" sx={{ mt: 3 }}>Constants (B)</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {B.map((val, i) => (
          <TextField
            key={i}
            type="number"
            value={B[i]}
            onChange={(e) => {
              const newB = [...B];
              newB[i] = parseFloat(e.target.value);
              setB(newB);
            }}
            sx={{ width: 80 }}
          />
        ))}
      </Box>

      {/* Initial Guess Input */}
      <Typography variant="h6">Initial Guess (x₀)</Typography>
      <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
        {initialGuess.map((val, i) => (
          <TextField
            key={i}
            type="number"
            value={initialGuess[i]}
            onChange={(e) => {
              const newGuess = [...initialGuess];
              newGuess[i] = parseFloat(e.target.value);
              setInitialGuess(newGuess);
            }}
            sx={{ width: 80 }}
          />
        ))}
      </Box>

      {/* Calculate Button */}
      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 3 }}>
        Solve System
      </Button>

      {/* Results */}
      {solution !== null && iterations !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Solution (after {iterations} iterations):</Typography>
            <Typography>X = [{solution.map((x) => x.toFixed(6)).join(", ")}]</Typography>
          </CardContent>
        </Card>
      )}

      {/* Graph Visualization */}
      {convergenceData.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Convergence of Variables</Typography>
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
        </Box>
      )}
    </Box>
  );
};

export default Task3;
