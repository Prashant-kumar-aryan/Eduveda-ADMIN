import { useEffect, useRef, useState } from "react";
import CreatePopUp from "../components/CreateCourseDialog";
import Dialog from "../components/Dialog";
import axios from "axios";
import { BASE_URL } from "../BASE_URL";
import CourseCard from "../components/CourseCard";
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
      <Dialog ref={dialogref} toggleDialog={toggleDialog}>
        <CreatePopUp toggleDialog={toggleDialog} />
      </Dialog>

      <div>
        <header className="flex gap-5 justify-center items-center text-3xl font-bold border-b-1 border-gray-300 text-center mt-10 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
          <h1>Welcome Boss</h1>
        </header>

        <section className="px-10">
          <button
            className="bg-amber-400 rounded-2xl px-8 py-4 text-white font-semibold text-lg mt-10 block shadow-lg hover:bg-amber-500 transition-colors duration-300"
            onClick={toggleDialog}
          >
            create course +
          </button>
        </section>

        <section className="px-10 mb-10">
          <h2 className="text-2xl font-semibold mt-10">All Courses</h2>

          {loading ? (
            <Spinner />
          ) : (
            <ul className="mt-5 space-y-4">
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
