import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";

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
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Task 6: Newton’s Forward Interpolation</h2>
      <p className="mb-6">Estimate \( f(x) \) using Newton’s Forward Difference Formula.</p>

      {/* Data Points Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Data Points (x, y)</h3>
        {points.map((point, i) => (
          <div key={i} className="flex space-x-2">
            <input
              type="number"
              value={point.x}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[i].x = parseFloat(e.target.value);
                setPoints(newPoints);
              }}
              className="border p-2 w-16 text-center"
            />
            <input
              type="number"
              value={point.y}
              onChange={(e) => {
                const newPoints = [...points];
                newPoints[i].y = parseFloat(e.target.value);
                setPoints(newPoints);
              }}
              className="border p-2 w-16 text-center"
            />
          </div>
        ))}
      </div>

      {/* Target X Input */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Target x-value</h3>
        <input
          type="number"
          value={xTarget}
          onChange={(e) => setXTarget(parseFloat(e.target.value))}
          className="border p-2 w-16 text-center"
        />
      </div>

      {/* Calculate Button */}
      <button
        onClick={handleCalculate}
        className="mt-6 px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Compute Interpolation
      </button>

      {/* Results */}
      {estimatedValue !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg font-bold">Estimated Value:</p>
          <p className="text-blue-600">f({xTarget}) = {estimatedValue.toFixed(4)}</p>
        </div>
      )}

      {/* Difference Table */}
      {differenceTable !== null && (
        <div className="mt-6">
          <h3 className="text-lg font-bold">Forward Difference Table</h3>
          <table className="border-collapse border border-gray-400">
            <tbody>
              {differenceTable.map((row, i) => (
                <tr key={i}>
                  {row.map((val, j) => (
                    <td key={j} className="border p-2">{val.toFixed(4)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Graph Visualization */}
      {estimatedValue !== null && (
        <div className="mt-6 w-full">
          <h3 className="text-lg font-bold">Data Points and Estimated Value</h3>
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
        </div>
      )}
    </div>
  );
};

export default Task6;
