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

const Task7 = () => {
  const [xStart, setXStart] = useState(0);
  const [yStart, setYStart] = useState(1);
  const [xTarget, setXTarget] = useState(0.1);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [taylorData, setTaylorData] = useState<any[]>([]);

  // Function to compute Taylor series approximation for dy/dx = y^2 + x^2
  const taylorSeries = (x0: number, y0: number, h: number) => {
    // Compute derivatives of the function dy/dx = y^2 + x^2
    let yPrime = y0 ** 2 + x0 ** 2;
    let yDoublePrime = 2 * y0 * yPrime + 2 * x0;
    let yTriplePrime = 2 * y0 * yDoublePrime + 2 * yPrime ** 2 + 2;

    // Taylor series expansion: y(x) = y0 + h * y' + (h^2 / 2!) * y'' + (h^3 / 3!) * y'''
    let y1 = y0 + h * yPrime + (h ** 2 / 2) * yDoublePrime + (h ** 3 / 6) * yTriplePrime;

    return y1;
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = taylorSeries(xStart, yStart, xTarget - xStart);
    setEstimatedValue(result);

    // Generate data for visualization (for y(0.1) and y(0.2))
    let data = [];
    for (let i = 0; i <= 0.2; i += 0.01) {
      data.push({ x: i, y: taylorSeries(xStart, yStart, i - xStart) });
    }
    setTaylorData(data);
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 7: Taylor Series Method
      </Typography>

      {/* Math Formula */}
      <BlockMath math="y(x) = y_0 + h \cdot y' + \frac{h^2}{2!} \cdot y'' + \frac{h^3}{3!} \cdot y'''" />

      {/* Initial Conditions */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Enter Initial Conditions
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
        <TextField
          label="x₀"
          type="number"
          value={xStart}
          onChange={(e) => setXStart(parseFloat(e.target.value))}
          sx={{ width: 120 }}
        />
        <TextField
          label="y₀"
          type="number"
          value={yStart}
          onChange={(e) => setYStart(parseFloat(e.target.value))}
          sx={{ width: 120 }}
        />
      </Box>

      {/* Target X Input */}
      <TextField
        label="Target x-value"
        type="number"
        value={xTarget}
        onChange={(e) => setXTarget(parseFloat(e.target.value))}
        sx={{ mt: 2, width: 150 }}
      />

      {/* Calculate Button */}
      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 3 }}>
        Compute Approximation
      </Button>

      {/* Results */}
      {estimatedValue !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Estimated Value:</Typography>
            <Typography>
              y({xTarget}) = {estimatedValue.toFixed(4)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Graph Visualization */}
      {taylorData.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Taylor Series Approximation</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={taylorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" label={{ value: "x", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "y", angle: -90, position: "insideLeft" }} />
              <Tooltip />
              <Line type="monotone" dataKey="y" stroke="#FF5733" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Task7;
