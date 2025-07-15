import { Link, useParams, useLocation } from "react-router-dom";

const navItems = [
  { to: "", label: "Details" },
  { to: "content", label: "Content" },
  { to: "stream", label: "Stream" },
  { to: "comments", label: "Comments" },
];

const CourseNavbar = () => {
  const { courseId } = useParams();
  const location = useLocation();

  return (
    <nav
      className="md:h-dvh mt-5 shadow-2xl md:text-base text-xs"
      aria-label="Course navigation"
    >
      <div>
        <ul className="flex flex-col gap-4 px-4">
          <li className="w-full">
            <h1 className="text-xs md:text-2xl md:px-4 md:py-2 py-1 px-2 rounded-md font-medium bg-violet-500 text-white text-left">
              Class Room
            </h1>
          </li>

          <li className="w-full">
            <Link
              to="/courses"
              className="block px-4 py-2 rounded-md font-medium text-indigo-600 hover:text-indigo-800 text-left"
            >
              ← Back to Courses
            </Link>
          </li>
        </ul>
      </div>
      <div className="pt-4">
        <ul className="flex flex-col md:gap-4 md:px-4">
          {navItems.map((item) => {
            const fullPath = `/courses/${courseId}${
              item.to ? `/${item.to}` : ""
            }`;
            const isActive = location.pathname === fullPath;

            return (
              <li key={item.label} className="w-full">
                <Link
                  to={fullPath}
                  className={`block md:px-4 px-2 py-1 md:py-2 rounded-md md:font-medium transition-colors duration-150 ${
                    isActive
                      ? "bg-indigo-100 text-indigo-700"
                      : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-700"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default CourseNavbar;
