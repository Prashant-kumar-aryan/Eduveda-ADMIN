import { Outlet } from "react-router-dom";
import CourseNavbar from "../components/navbar/CourseNavbar";

const CourseDetailsLayout = () => {
  return (
    <section className="flex md:flex-row flex-col w-full">
      <aside className="md:w-3/12">
        <CourseNavbar />
      </aside>
      <main className="md:w-9/12 w-full relative">
        <Outlet />
      </main>
    </section>
  );
};

export default CourseDetailsLayout;
