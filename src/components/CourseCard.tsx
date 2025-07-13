import { useRef, useState } from "react";
import Dialog from "./Dialog";
import DeleteCourseDialog from "./DeleteCourseDialog";
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
      <li className="bg-white rounded-xl border p-5 flex gap-5 items-start shadow-sm hover:shadow-lg transition duration-200 group">
        <img
          src={course.image}
          alt={course.title}
          className="w-28 h-28 rounded-lg object-cover border"
        />

        <div className="flex-1 space-y-2">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-blue-600 transition">
              {course.title}
            </h3>
            <span className="text-sm text-gray-400 mt-1">#{course.id}</span>
          </div>

          <p className="text-gray-700 text-base">
            <strong>Author:</strong> {course.author}
          </p>

          <p className="text-base text-gray-900">
            <strong>Current Price:</strong>{" "}
            <span className="text-xl font-bold text-green-600">
              ₹{course.price}
            </span>{" "}
            <span className="line-through text-gray-400 ml-2 text-sm">
              ₹{course.originalPrice}
            </span>
          </p>

          <p className="text-base text-blue-700">
            <strong>Discount:</strong> {course.coupon}
          </p>

          <div>
            <strong className="text-gray-700">Tags:</strong>
            <div className="flex flex-wrap gap-2 mt-1">
              {course.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-800 px-3 py-1 text-sm rounded-full border border-blue-200 hover:bg-blue-100 transition"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 mt-4 text-lg font-bold justify-end">
            <Link to={`/courses/${course.id}`}>
              <button className="text-center px-10 py-2  rounded-lg bg-green-500 text-white hover:bg-blue-600 transition">
                ✏️ Edit
              </button>
            </Link>
            <button
              onClick={handleDelete}
              className="px-5 py-2  rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      </li>

      {/* Dialog */}
      <Dialog ref={dialogRef} toggleDialog={toggleDialog}>
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
