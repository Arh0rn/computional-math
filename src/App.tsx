import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Task1 from "./pages/Task1";
import Task2 from "./pages/Task2";
import Task3 from "./pages/Task3";
import Task4 from "./pages/Task4";
import Task5 from "./pages/Task5";
import Task6 from "./pages/Task6";
import Task7 from "./pages/Task7";
import Task8 from "./pages/Task8";

function Home() {
  return (
    <div className="flex flex-col items-center p-10 space-y-4">
      <h1 className="text-2xl font-bold">Computational Mathematics</h1>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/task1">
          <Button>Task 1: Graphical Method</Button>
        </Link>
        <Link to="/task2">
          <Button>Task 2: Root-Finding</Button>
        </Link>
        <Link to="/task3">
          <Button>Task 3: Jacobi Method</Button>
        </Link>
        <Link to="/task4">
          <Button>Task 4: Matrix Inversion</Button>
        </Link>
        <Link to="/task5">
          <Button>Task 5: Linear Curve Fitting</Button>
        </Link>
        <Link to="/task6">
          <Button>Task 6: Newton’s Forward Diff.</Button>
        </Link>
        <Link to="/task7">
          <Button>Task 7: Taylor Series</Button>
        </Link>
        <Link to="/task8">
          <Button>Task 8: Simpson’s 3/8 Rule</Button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/task1" element={<Task1 />} />
        <Route path="/task2" element={<Task2 />} />
        <Route path="/task3" element={<Task3 />} />
        <Route path="/task4" element={<Task4 />} />
        <Route path="/task5" element={<Task5 />} />
        <Route path="/task6" element={<Task6 />} />
        <Route path="/task7" element={<Task7 />} />
        <Route path="/task8" element={<Task8 />} />
      </Routes>
    </Router>
  );
}
