import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
    <div className="container">
      <h1>Computational Mathematics</h1>
      <div className="card">
        <p>Interactive tools for solving computational math problems.</p>
        <div className="button-group">
          <Link to="/task1"><button>Task 1: Graphical Method</button></Link>
          <Link to="/task2"><button>Task 2: Root-Finding</button></Link>
          <Link to="/task3"><button>Task 3: Jacobi Method</button></Link>
          <Link to="/task4"><button>Task 4: Matrix Inversion</button></Link>
          <Link to="/task5"><button>Task 5: Linear Curve Fitting</button></Link>
          <Link to="/task6"><button>Task 6: Newton’s Forward Diff.</button></Link>
          <Link to="/task7"><button>Task 7: Taylor Series</button></Link>
          <Link to="/task8"><button>Task 8: Simpson’s 3/8 Rule</button></Link>
        </div>
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
