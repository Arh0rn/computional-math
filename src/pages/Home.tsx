import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <h1 className="text-3xl font-bold mb-6">Computational Mathematics</h1>
      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: 8 }, (_, i) => (
          <Link
            key={i}
            to={`/task${i + 1}`}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Task {i + 1}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
