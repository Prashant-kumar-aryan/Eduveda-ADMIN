import { useNavigate, useParams } from "react-router-dom";
import Back from "../Back";
import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "../../BASE_URL";
import ClassIcon from "@mui/icons-material/Class";
import Dialog from "../popUps/Dialog";
import ConfirmPopUp from "../popUps/ConfirmPopUp";
import useDialog from "../../hooks/useDialog";

interface Chapter {
  _id: number;
  name: string;
}

const ChapterContents = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [chapter, setChapter] = useState<string>("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const { subjectId } = useParams();

  const { ref, toggleDialog } = useDialog(); // Dialog hook

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/courses/subjects/${subjectId}/chapters`
      );
      setChapters(res.data.chapters);
    } catch (error) {
      toast.error("Failed to fetch chapters");
    } finally {
      setLoading(false);
    }
  };

  // Open confirmation dialog on form submit
  const handleAddChapter = async (e: FormEvent) => {
    e.preventDefault();
    if (!chapter.trim()) return toast.error("Chapter name is required");
    toggleDialog(); // show confirm popup
  };

  // Actual chapter creation after user confirms
  const handleConfirm = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/courses/subjects/${subjectId}/chapters`,
        {
          name: chapter.trim(),
        }
      );
      setChapters((prev) => [...prev, res.data.chapter]);
      setChapter("");
      toast.success("Chapter added successfully");
    } catch (error) {
      toast.error("Failed to add chapter");
    } finally {
      toggleDialog();
      setLoading(false);
    }
  };

  const handleCancel = () => {
    toggleDialog(); // just close dialog
  };

  useEffect(() => {
    fetchChapters();
  }, [subjectId]);
  const navigate = useNavigate();
  const goToChapterContent = (ch: Chapter) => {
    navigate(`${ch._id}`);
  };
  return (
    <div className="p-4">
      {/* Back Button */}
      <div className="mb-4">
        <Back text="Back to Subjects" />
      </div>

      {/* Confirm Dialog */}
      <Dialog
        ref={ref}
        toggleDialog={toggleDialog}
        className="mx-auto w-full max-w-lg mt-5 rounded-sm"
      >
        <ConfirmPopUp
          text={`Are you sure you want to add this chapter: ${chapter}?`}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Dialog>

      {/* Add Chapter Form */}
      <form
        className="flex flex-col gap-5 px-5 pt-5"
        onSubmit={handleAddChapter}
      >
        <input
          type="text"
          placeholder="Enter chapter name"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
          className="w-full max-w-md bg-black/50 text-white placeholder-white/60 border border-white/20 backdrop-blur-lg rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
        <button
          type="submit"
          className="flex items-center gap-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-400 self-start text-white font-semibold px-5 py-2 rounded-2xl"
        >
          <ClassIcon className="text-white" />
          Add Chapter
        </button>
      </form>

      {/* Chapters List */}
      <div className="mt-6 px-5">
        <h2 className="text-lg font-semibold mb-4">Chapters</h2>
        {chapters.length === 0 ? (
          <p className="text-gray-400">No chapters available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {chapters.map((ch) => (
              <div
                key={ch._id}
                onClick={() => goToChapterContent(ch)}
                className="cursor-pointer active:scale-99 flex items-center shadow-md text-gray-800 shadow-purple-400 hover:scale-102 transition-all py-5 px-5 gap-2 "
              >
                <ClassIcon />
                <h3 className="text-md font-medium">{ch.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterContents;
