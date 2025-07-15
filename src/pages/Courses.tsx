import { useEffect, useRef, useState } from "react";
import CreatePopUp from "../components/popUps/CreateCoursePopUp";
import Dialog from "../components/popUps/Dialog";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import CourseCard from "../components/cards/CourseCard";
import Spinner from "../components/Spinner";
import toast from "react-hot-toast";

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

const Courses = () => {
  const dialogref = useRef<HTMLDialogElement>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleDialog = () => {
    if (!dialogref.current) return;
    dialogref.current.hasAttribute("open")
      ? dialogref.current.close()
      : dialogref.current.showModal();
  };

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/courses`);
      setCourses(response.data.data);
    } catch (e: any) {
      console.error(e);
      toast.error("❌ Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <>
      <Dialog
        ref={dialogref}
        toggleDialog={toggleDialog}
        className={`mx-auto  w-full max-w-3xl mt-5 rounded-sm`}
      >
        <CreatePopUp toggleDialog={toggleDialog} />
      </Dialog>

      <div className="min-h-screen bg-gray-50 text-slate-800">
        <header
          className="text-2xl font-bold shadow
         text-center p-6  text-indigo-400"
        >
          -Welcome Boss-
        </header>

        <section className="px-10">
          <button
            className="bg-indigo-400 hover:shadow-2xl hover:bg-indigo-500 transition-colors duration-300 text-white font-semibold text-md mt-10 rounded-full px-6 py-3 shadow-md"
            onClick={toggleDialog}
          >
            + Create Course
          </button>
        </section>

        <section className="px-10 pb-10">
          <h2 className="text-2xl font-semibold mt-10 mb-4">All Courses</h2>

          {loading ? (
            <Spinner />
          ) : (
            <ul className="flex gap-4 flex-wrap">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
};

export default Courses;
