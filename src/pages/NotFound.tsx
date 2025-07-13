import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-6 text-gray-400">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/courses"
        className="bg-white text-black px-6 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition"
      >
        🔙 Back to Courses
      </Link>
    </div>
  );
};

export default NotFound;
