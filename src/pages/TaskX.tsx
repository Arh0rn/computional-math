import { useState } from "react";

const TaskX = () => {
  const [result, setResult] = useState<number | null>(null);

  const handleCalculate = () => {
    // Perform the computation for the specific task
    setResult(Math.random()); // Replace with actual logic
  };

  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-2xl font-bold mb-4">Task X: [Task Title]</h1>
      <p className="mb-6">[Brief description of the task]</p>

      <button
        onClick={handleCalculate}
        className="px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-lg">Result: {result}</p>
        </div>
      )}
    </div>
  );
};

export default TaskX;
