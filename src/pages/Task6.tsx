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
  // Default Data Points
  const [points, setPoints] = useState([
    { x: 0, y: 1 },
    { x: 1, y: 4 },
    { x: 2, y: 9 },
    { x: 3, y: 16 },
  ]);
  const [xTarget, setXTarget] = useState(1.5);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const [differenceTable, setDifferenceTable] = useState<number[][] | null>(null);

  // Function to generate forward difference table
  const generateDifferenceTable = (data: { x: number; y: number }[]) => {
    const n = data.length;
    let table = Array.from({ length: n }, (_, i) => [data[i].y]);

    for (let j = 1; j < n; j++) {
      for (let i = 0; i < n - j; i++) {
        table[i].push(table[i + 1][j - 1] - table[i][j - 1]);
      }
    }
    return table;
  };

  // Function to compute interpolation using Newton's Forward Difference Formula
  const newtonForwardInterpolation = (data: { x: number; y: number }[], xTarget: number) => {
    const n = data.length;
    const h = data[1].x - data[0].x;
    const p = (xTarget - data[0].x) / h;
    const table = generateDifferenceTable(data);
    let result = table[0][0];
    let factorial = 1;
    let pProduct = 1;

    for (let i = 1; i < n; i++) {
      pProduct *= (p - (i - 1));
      factorial *= i;
      result += (pProduct / factorial) * table[0][i];
    }

    setDifferenceTable(table);
    return result;
  };

  // Handle Calculation
  const handleCalculate = () => {
    const result = newtonForwardInterpolation(points, xTarget);
    setEstimatedValue(result);
  };

  return (
    <Box>
      <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
        Task 6: Newton’s Forward Interpolation
      </Typography>

      {/* Math Formula */}
      <BlockMath math="f(x) = y_0 + p \Delta y_0 + \frac{p(p-1)}{2!} \Delta^2 y_0 + \dots" />

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
        Compute Interpolation
      </Button>

      {/* Results */}
      {estimatedValue !== null && (
        <Card sx={{ mt: 4, p: 3 }}>
          <CardContent>
            <Typography variant="h6">Estimated Value:</Typography>
            <Typography>
              f({xTarget}) = {estimatedValue.toFixed(4)}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* Difference Table */}
      {differenceTable !== null && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h6">Forward Difference Table</Typography>
          <table style={{ borderCollapse: "collapse", border: "1px solid gray" }}>
            <tbody>
              {differenceTable.map((row, i) => (
                <tr key={i}>
                  {row.map((val, j) => (
                    <td key={j} style={{ border: "1px solid gray", padding: "5px" }}>
                      {val.toFixed(4)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
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
