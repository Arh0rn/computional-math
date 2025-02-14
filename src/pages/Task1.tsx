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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const Task1 = () => {
  const [method, setMethod] = useState("newton"); // Default: Newton-Raphson
  const [initialGuess, setInitialGuess] = useState(0.5);
  const [numericalRoot, setNumericalRoot] = useState<number | null>(null);
  const [absoluteError, setAbsoluteError] = useState<number | null>(null);
  const [visualRoot] = useState(0.739); // Approximate root from graph
  const [data, setData] = useState<{ x: number; y: number }[]>([]);

  // Function to generate dynamic graph data
  const generateData = (min: number, max: number) => {
    return Array.from({ length: 100 }, (_, i) => {
      const x = min + (i / 100) * (max - min);
      return { x, y: Math.cos(x) - x };
    });
  };

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

  // Handle calculation and update graph
  const handleCalculate = () => {
    setData(generateData(0, 1)); // Regenerate graph data when calculating

    let root = method === "newton" ? newtonRaphsonMethod(initialGuess) : bisectionMethod(0, 1);
    if (root !== null) {
      setNumericalRoot(root);
      setAbsoluteError(Math.abs(root - visualRoot));
    }
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 1: Graphical Method and Absolute Error
      </Typography>

      <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
        Plot the function and find its root using numerical methods.
      </Typography>

      {/* Math formula rendered with KaTeX */}
      <BlockMath math="f(x) = \cos(x) - x" />

      {/* Method Selection */}
      <Box display="flex" gap={2} alignItems="center" sx={{ mb: 3 }}>
        <FormControl>
          <InputLabel>Root-Finding Method</InputLabel>
          <Select value={method} onChange={(e) => setMethod(e.target.value)} sx={{ minWidth: 200 }}>
            <MenuItem value="newton">Newton-Raphson</MenuItem>
            <MenuItem value="bisection">Bisection Method</MenuItem>
          </Select>
        </FormControl>

        {method === "newton" && (
          <TextField
            label="Initial Guess"
            type="number"
            value={initialGuess}
            onChange={(e) => setInitialGuess(parseFloat(e.target.value))}
            sx={{ width: 120 }}
          />
        )}
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
      {numericalRoot !== null && absoluteError !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Results</Typography>
            <Typography>
              <strong>Numerical Root:</strong> {numericalRoot.toFixed(6)}
            </Typography>
            <Typography>
              <strong>Absolute Error:</strong> {absoluteError.toExponential(3)}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default Task1;
