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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
} from "recharts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const Task5 = () => {
  // Default Data Points
  const [points, setPoints] = useState([
    { x: 1, y: 5 },
    { x: 2, y: 8 },
    { x: 3, y: 12 },
    { x: 4, y: 15 },
    { x: 5, y: 20 },
  ]);
  const [lineEquation, setLineEquation] = useState<{ a: number; b: number } | null>(null);
  const [fittedLine, setFittedLine] = useState<any[]>([]);

  // Function to calculate Least Squares Regression
  const leastSquaresFit = (data: { x: number; y: number }[]) => {
    const n = data.length;
    const sumX = data.reduce((sum, p) => sum + p.x, 0);
    const sumY = data.reduce((sum, p) => sum + p.y, 0);
    const sumXY = data.reduce((sum, p) => sum + p.x * p.y, 0);
    const sumX2 = data.reduce((sum, p) => sum + p.x * p.x, 0);

    // Compute coefficients a and b
    const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - a * sumX) / n;

    // Compute fitted line points
    const fittedData = data.map((p) => ({ x: p.x, y: a * p.x + b }));

    return { a, b, fittedData };
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = leastSquaresFit(points);
    setLineEquation({ a: result.a, b: result.b });
    setFittedLine(result.fittedData);
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 5: Linear Curve Fitting
      </Typography>

      {/* Math Formula Display */}
      <BlockMath math="y = ax + b" />

      {/* Data Points Input */}
      <Typography variant="h6" sx={{ mt: 3 }}>
        Enter Data Points (x, y)
      </Typography>
      {points.map((point, i) => (
        <Box key={i} sx={{ display: "flex", gap: 2, mb: 1 }}>
          <TextField
            type="number"
            label={`x${i + 1}`}
            value={point.x}
            onChange={(e) => {
              const newPoints = [...points];
              newPoints[i].x = parseFloat(e.target.value);
              setPoints(newPoints);
            }}
            sx={{ width: 80 }}
          />
          <TextField
            type="number"
            label={`y${i + 1}`}
            value={point.y}
            onChange={(e) => {
              const newPoints = [...points];
              newPoints[i].y = parseFloat(e.target.value);
              setPoints(newPoints);
            }}
            sx={{ width: 80 }}
          />
        </Box>
      ))}

      {/* Calculate Button */}
      <Button variant="contained" color="primary" onClick={handleCalculate} sx={{ mt: 3 }}>
        Compute Best-Fit Line
      </Button>

      {/* Results */}
      {lineEquation !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Best-Fit Line Equation:</Typography>
            <Typography>
              y = {lineEquation.a.toFixed(4)}x + {lineEquation.b.toFixed(4)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Graph Visualization */}
      {fittedLine.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Data Points and Best-Fit Line</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Data Points" data={points} fill="red" />
              <Line type="linear" dataKey="y" data={fittedLine} stroke="blue" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Task5;
