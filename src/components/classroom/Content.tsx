import { useEffect, useState, type FormEvent } from "react";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import Dialog from "../popUps/Dialog";
import ConfirmPopUp from "../popUps/ConfirmPopUp";
import useDialog from "../../hooks/useDialog";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "../../BASE_URL";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../Spinner";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

interface Subject {
  subjectId: number;
  name: string;
  description: string;
  createdAt: string;
}

const Content = () => {
  const { ref, toggleDialog } = useDialog();
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { courseId } = useParams();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;
    setIsLoading(true);
    toggleDialog(); // Open confirmation dialog
  };

  const handleConfirm = async () => {
    await addSubject();
    toggleDialog();
    setIsLoading(false);
    await fetchSubjects();
  };

  const handleCancel = () => {
    toggleDialog();
    setIsLoading(false);
  };

  const addSubject = async () => {
    try {
      await axios.post(`${BASE_URL}/courses/${courseId}/subjects`, {
        subjectName: subject,
        subjectDescription: "",
      });
      toast.success("Subject added successfully!");
      setSubject("");
      fetchSubjects();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add subject.");
    }
  };

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/courses/${courseId}/subjects`);
      console.log(res.data);
      setSubjects(res.data);
    } catch (error) {
      toast.error("Failed to fetch subjects.");
    } finally {
      setIsLoading(false);
    }
  };

  // const
  useEffect(() => {
    fetchSubjects();
  }, []);
  const navigate = useNavigate();
  const goToSubject = (subject: Subject) => {
    // toast.success("CLicked");
    navigate(`${subject.subjectId}`, {
      state: { subject },
    });
  };
  return (
    <section className="w-full">
      {/* Confirm Dialog */}
      <Dialog
        ref={ref}
        toggleDialog={toggleDialog}
        className="mx-auto w-full max-w-lg mt-5 rounded-sm"
      >
        <ConfirmPopUp
          text={`Are you sure you want to add this subject: ${subject}?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Dialog>

      {/* Header */}
      <header>
        <h1 className="shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] px-10 text-gray-700 py-4 text-lg font-semibold">
          Course Content
        </h1>
      </header>

      {/* Form */}
      <main>
        <form className="flex flex-col gap-5 px-5 pt-5" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter subject name"
            className="w-full max-w-md bg-black/50 text-white placeholder-white/60 border border-white/20 backdrop-blur-lg rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button
            type="submit"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 self-start text-white font-semibold px-5 py-2 rounded-2xl"
          >
            <LibraryBooksIcon className="text-white" />
            Add Subject
          </button>
        </form>

        {/* Subject List */}
        <section className="px-5 ">
          <h2 className="text-xl font-semibold text-white mb-4">Subjects</h2>

          {isLoading ? (
            <Spinner />
          ) : subjects.length === 0 ? (
            <p className="text-white/60">No subjects found. Add one above!</p>
          ) : (
            <div className="flex flex-col gap-4 cursor-pointer">
              <h1 className="text-lime-500 text-xl">Subjects</h1>
              {subjects.map((subj) => (
                <div
                  key={subj.subjectId}
                  className="shadow rounded-sm flex items-center p-3 hover:shadow hover:shadow-amber-300 active:scale-98"
                  onClick={() => goToSubject(subj)}
                >
                  <ImportContactsIcon
                    style={{ fontSize: 28, color: "black", marginRight: 10 }}
                  />
                  <div>
                    <h3>{subj.name}</h3>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(subj.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </section>
  );
};

export default Content;
