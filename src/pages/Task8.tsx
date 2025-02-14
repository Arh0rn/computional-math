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
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const Task8 = () => {
  const [a, setA] = useState(2);  // Lower limit of integration
  const [b, setB] = useState(5);  // Upper limit of integration
  const [n, setN] = useState(6);  // Number of subintervals
  const [approxIntegral, setApproxIntegral] = useState<number | null>(null);
  const [exactIntegral, setExactIntegral] = useState<number | null>(null);
  const [error, setError] = useState<number | null>(null);
  const [plotData, setPlotData] = useState<any[]>([]);

  // Function to compute f(x) = x^3
  const f = (x: number) =>  x ** 3;

  // Function to compute exact integral using symbolic integration
  const computeExactIntegral = (a: number, b: number) => {
    return (2 / 4) * (b ** 4 - a ** 4);  // Integral of 2x^3 is x^4
  };

  // Function to apply Simpson’s 3/8 Rule
  const simpsons38Rule = (a: number, b: number, n: number) => {
    const h = (b - a) / n;
    let sum = f(a) + f(b);
    for (let i = 1; i < n; i++) {
      if (i % 3 === 0) {
        sum += 2 * f(a + i * h);  // For every 3rd term, multiply by 2
      } else {
        sum += 3 * f(a + i * h);  // Multiply other terms by 3
      }
    }
    return (3 * h / 8) * sum;  // Apply the 3/8 factor
  };

  // Handle Calculation
  const handleCalculate = () => {
    const approxValue = simpsons38Rule(a, b, n);
    const exactValue = computeExactIntegral(a, b);
    const errorValue = Math.abs(approxValue - exactValue);

    setApproxIntegral(approxValue);
    setExactIntegral(exactValue);
    setError(errorValue);

    // Generate plot data for visualization
    let data = [];
    for (let i = a; i <= b; i += (b - a) / n) {
      data.push({ x: i, y: f(i) });
    }
    setPlotData(data);
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 8: Simpson’s 3/8 Rule
      </Typography>

      {/* Math Formula */}
      <BlockMath math="\int_2^5 x^3 \, dx \approx \frac{3h}{8} \left[ f(a) + 3 \sum f(x_i) + 3 \sum f(x_j) + f(b) \right]" />

      {/* Input Fields */}
      <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
        <TextField
          label="Lower Limit (a)"
          type="number"
          value={a}
          onChange={(e) => setA(parseFloat(e.target.value))}
          sx={{ width: 120 }}
        />
        <TextField
          label="Upper Limit (b)"
          type="number"
          value={b}
          onChange={(e) => setB(parseFloat(e.target.value))}
          sx={{ width: 120 }}
        />
        <TextField
          label="Subintervals (n)"
          type="number"
          value={n}
          onChange={(e) => setN(parseInt(e.target.value))}
          sx={{ width: 120 }}
        />
      </Box>

      {/* Compute Button */}
      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 3 }}>
        Compute Integral
      </Button>

      {/* Results */}
      {approxIntegral !== null && exactIntegral !== null && error !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Results</Typography>
            <Typography>
              <strong>Approximate Integral:</strong> {approxIntegral.toFixed(6)}
            </Typography>
            <Typography>
              <strong>Exact Integral:</strong> {exactIntegral.toFixed(6)}
            </Typography>
            <Typography>
              <strong>Absolute Error:</strong> {error.toExponential(3)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Graph Visualization */}
      {plotData.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Function & Simpson's 3/8 Approximation</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={plotData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: "x", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "f(x)", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Area type="monotone" dataKey="y" stroke="#8884d8" fillOpacity={0.3} fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Task8;
