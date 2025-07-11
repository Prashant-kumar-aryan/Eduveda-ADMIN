import { useRef, useState } from "react";
import CreatePopUp from "../components/CreateCourseDialog";
import Dialog from "../components/Dialog";

const Home = () => {
  const dialogref = useRef<HTMLDialogElement>(null);
  const toggleDialog = () => {
    if (!dialogref.current) {
      return;
    }
    dialogref.current.hasAttribute("open")
      ? dialogref.current.close()
      : dialogref.current.showModal();
  };
  return (
    <>
      <Dialog ref={dialogref} toggleDialog={toggleDialog}>
        <CreatePopUp toggleDialog={toggleDialog} />
      </Dialog>
      <div>
        <header className=" flex gap-5 justify-center items-center text-3xl font-bold border-b-1 border-gray-300 text-center mt-10 bg-linear-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg shadow-lg">
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
        <section className="px-10">
          <h2 className="text-2xl font-semibold mt-10">All Courses</h2>
          <ul className="mt-5">
            <li className="border-b border-gray-300 py-2">Course 1</li>
            <li className="border-b border-gray-300 py-2">Course 2</li>
            <li className="border-b border-gray-300 py-2">Course 3</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default Home;
