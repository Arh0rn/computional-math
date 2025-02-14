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
} from "recharts";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css"; // Import KaTeX styles

const Task6 = () => {
  // Updated data points as per the new problem statement
  const [points, setPoints] = useState([
    { x: 0, y: 1 },
    { x: 1, y: 3 },
    { x: 2, y: 7 },
  ]);
  const [xTarget, setXTarget] = useState(1);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);

  // Function to calculate first derivative using Newton’s Forward Difference Formula
  const newtonForwardDifference = (data: { x: number; y: number }[], xTarget: number) => {
    const n = data.length;
    const h = data[1].x - data[0].x; // Assuming equally spaced data
    const p = (xTarget - data[0].x) / h; // Compute p
    
    const forwardDifference = (i: number) => {
      if (i === 0) return (data[1].y - data[0].y) / h; // Forward difference for the first interval
      if (i === 1) return (data[2].y - data[1].y) / h; // Forward difference for the second interval
      return 0;
    };

    // Estimating the first derivative using Newton's Forward Difference Formula
    let result = forwardDifference(0) + p * forwardDifference(1);

    return result;
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = newtonForwardDifference(points, xTarget);
    setEstimatedValue(result);
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 6: First Derivative Using Newton’s Forward Difference Formula
      </Typography>

      {/* Math Formula */}
      <BlockMath math="f'(x) = \frac{y_1 - y_0}{h} + p \cdot \frac{y_2 - y_1}{h}" />

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
        Compute Derivative
      </Button>

      {/* Results */}
      {estimatedValue !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Estimated Derivative:</Typography>
            <Typography>
              f'({xTarget}) = {estimatedValue.toFixed(4)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Graph Visualization */}
      {estimatedValue !== null && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Data Points and Estimated Value</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" dataKey="x" name="X" />
              <YAxis type="number" dataKey="y" name="Y" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="Data Points" data={points} fill="red" />
              <Scatter name="Estimated Point" data={[{ x: xTarget, y: estimatedValue }]} fill="blue" />
            </ScatterChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

export default Task6;
