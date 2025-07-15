import { useRef } from "react";
import Dialog from "../popUps/Dialog";
import DeleteCourseDialog from "../popUps/DeleteCoursePopUp";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice: number;
  coupon: string;
  tags: string[];
  image: string;
}

const CourseCard = ({ course }: { course: Course }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  const handleDelete = () => {
    toggleDialog();
  };

  const confirmDelete = () => {
    console.log("Confirmed deletion of course:", course.title);
    toggleDialog();
    // TODO: Call delete API
  };

  return (
    <>
      <li className="rounded-xl p-3 flex flex-col md:flex-row gap-4 items-center md:items-start shadow-md hover:shadow-lg transform transition-all duration-200 group border border-violet-200 ">
        <img
          src={course.image}
          alt={course.title}
          className="w-20 h-20 rounded-lg object-cover border-2 border-amber-400 shadow-sm"
        />

        <div className="flex-1 space-y-1 w-full">
          <div className="flex justify-between items-start gap-1">
            <h3 className="text-md font-semibold text-gray-800 group-hover:text-indigo-800 transition-colors truncate">
              {course.title}
            </h3>
            <span className="text-xs text-gray-400 mt-1">#{course.id}</span>
          </div>

          <p className="text-gray-700 text-xs">
            <strong>Author:</strong> {course.author}
          </p>

          <p className="text-xs text-gray-900">
            <strong>Current Price:</strong>{" "}
            <span className="text-md font-bold text-green-600">
              ₹{course.price}
            </span>{" "}
            <span className="line-through text-gray-400 ml-1 text-xs">
              ₹{course.originalPrice}
            </span>
          </p>

          <p className="text-xs ">
            <strong>Discount:</strong> {course.coupon}
          </p>

          <div>
            <strong className="text-gray-700 text-xs">Tags:</strong>
            <div className="flex flex-wrap gap-1 mt-1">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-800 px-2 py-0.5 text-xs rounded-full border border-blue-200 hover:bg-blue-100 transition-colors duration-150"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 mt-4 text-xs font-semibold justify-end w-full">
            <Link
              to={`/courses/${course.id}`}
              className="w-full sm:w-auto"
              state={{ courseName: course.title }}
            >
              <button
                className="w-full bg-gray-300 sm:w-auto text-center px-6 py-1.5 rounded-lg shadowb hover:bg-violet-200 focus:ring-2 focus:ring-blue-400 focus:outline-none transition"
                type="button"
              >
                ✏️ Edit Course
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto px-6 py-1.5 rounded-lg bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-400 focus:outline-none transition"
              type="button"
            >
              Delete Course
            </button>
          </div>
        </div>
      </li>

      {/* Dialog */}
      <Dialog
        ref={dialogRef}
        toggleDialog={toggleDialog}
        className={`mx-auto my-auto rounded-sm`}
      >
        <DeleteCourseDialog
          courseTitle={course.title}
          onCancel={toggleDialog}
          onConfirm={confirmDelete}
        />
      </Dialog>
    </>
  );
};

export default CourseCard;
