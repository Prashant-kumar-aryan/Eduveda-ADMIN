import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

// Define props properly
interface BackProps {
  text?: string;
  times?: number;
}

const Back = ({ text = "Back", times = -1 }: BackProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(times);
  };

  return (
    <div className="p-4 flex items-center gap-3">
      <button
        onClick={handleBack}
        aria-label="Go back"
        className="active:scale-98 p-2 rounded-full border-2 border-purple-400 shadow-xl hover:bg-gray-100 transition"
      >
        <ArrowBackIcon className="text-purple-700" />
      </button>
      <p className="text-sm text-gray-700 font-medium">{text}</p>
    </div>
  );
};

export default Back;
