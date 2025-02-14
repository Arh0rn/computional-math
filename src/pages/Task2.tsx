import { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const Task2 = () => {
  const [method, setMethod] = useState("falsePosition");
  const [a, setA] = useState(0);
  const [b, setB] = useState(3);
  const [data, setData] = useState<{ x: number; y: number }[]>([]);
  const [numericalRoot, setNumericalRoot] = useState<number | null>(null);
  const [iterations, setIterations] = useState<number | null>(null);
  const [relativeError, setRelativeError] = useState<number | null>(null);
  const [exactRoot] = useState(1.376383); // Exact root for error calculation

  // Function to regenerate graph data
  const generateData = (min: number, max: number) => {
    return Array.from({ length: 100 }, (_, i) => {
      const x = min + (i / 100) * (max - min);
      return { x, y: x ** 2 - 4 * Math.sin(x) };
    });
  };

  // False Position Method (Regula Falsi)
  const falsePositionMethod = (a: number, b: number, tolerance: number = 1e-6, maxIterations: number = 100) => {
    let fa = a ** 2 - 4 * Math.sin(a);
    let fb = b ** 2 - 4 * Math.sin(b);
    if (fa * fb > 0) return null; // No root in interval

    let iter = 0;
    while (iter < maxIterations) {
      let c = b - fb * (a - b) / (fa - fb); // False position formula
      let fc = c ** 2 - 4 * Math.sin(c);
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
    return { root: b, iterations: iter };
  };

  // Newton-Raphson Method
  const newtonRaphsonMethod = (x0: number, tolerance: number = 1e-6, maxIterations: number = 100) => {
    let x = x0;
    let iter = 0;
    while (iter < maxIterations) {
      let fx = x ** 2 - 4 * Math.sin(x);
      let dfx = 2 * x - 4 * Math.cos(x); // Derivative of f(x)
      if (Math.abs(fx) < tolerance) return { root: x, iterations: iter };
      x = x - fx / dfx;
      iter++;
    }
    return { root: x, iterations: iter };
  };

  // Handle Calculation
  const handleCalculate = () => {
    setData(generateData(a - 1, b + 1)); // Regenerate graph data based on user input

    let result = method === "falsePosition" ? falsePositionMethod(a, b) : newtonRaphsonMethod(a);
    if (result !== null) {
      setNumericalRoot(result.root);
      setIterations(result.iterations);
      setRelativeError(Math.abs((result.root - exactRoot) / exactRoot) * 100);
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 2: Comparison of Root-Finding Methods
      </Typography>

      {/* Math Formula Display */}
      <BlockMath math="f(x) = x^2 - 4sin(x)" />

      {/* Method Selection & Interval Inputs */}
      <Box display="flex" gap={2} alignItems="center" sx={{ mt: 3, mb: 3 }}>
        <FormControl>
          <InputLabel>Method</InputLabel>
          <Select value={method} onChange={(e) => setMethod(e.target.value)} sx={{ minWidth: 200 }}>
            <MenuItem value="falsePosition">False Position Method</MenuItem>
            <MenuItem value="newtonRaphson">Newton-Raphson Method</MenuItem>
          </Select>
        </FormControl>

        {/* Interval Input */}
        <TextField
          label="Interval a"
          type="number"
          value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
          sx={{ width: 120 }}
        />
        <TextField
          label="Interval b"
          type="number"
          value={b}
          onChange={(e) => setB(parseFloat(e.target.value))}
          sx={{ width: 120 }}
        />
      </Box>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" label={{ value: "x", position: "insideBottomRight", offset: -5 }} />
          <YAxis label={{ value: "f(x)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="y" stroke="#1976d2" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>

      {/* Calculate Button */}
      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 3 }}>
        Calculate Root and Update Graph
      </Button>

      {/* Results */}
      {numericalRoot !== null && iterations !== null && relativeError !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Results</Typography>
            <Typography>
              <strong>Numerical Root:</strong> {numericalRoot.toFixed(6)}
            </Typography>
            <Typography>
              <strong>Iterations:</strong> {iterations}
            </Typography>
            <Typography>
              <strong>Relative Error:</strong> {relativeError.toFixed(4)}%
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Task2;
