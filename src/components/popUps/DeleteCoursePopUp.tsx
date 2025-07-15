import { useState } from "react";

interface DeleteCourseDialogProps {
  courseTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteCourseDialog = ({
  courseTitle,
  onConfirm,
  onCancel,
}: DeleteCourseDialogProps) => {
  const [input, setInput] = useState("");

  const expectedText = `Delete the course ${courseTitle}`;
  const isMatch = input.trim() === expectedText;

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-xl font-bold text-red-600">Are you sure?</h2>
      <p className="text-gray-700">
        To confirm deletion, type exactly:{" "}
        <code className="bg-gray-100 px-2 py-1 rounded text-red-600 font-medium">
          {expectedText}
        </code>
      </p>

      <input
        type="text"
        className="w-full border rounded px-3 py-2 mt-2 text-gray-800"
        placeholder="Type confirmation text..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex justify-end gap-4 pt-4">
        <button
          onClick={() => {
            setInput("");
            onCancel();
          }}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition"
        >
          Cancel
        </button>
        <button
          disabled={!isMatch}
          onClick={() => {
            setInput("");
            onConfirm();
          }}
          className={`px-5 py-2 rounded-lg transition text-white ${
            isMatch
              ? "bg-red-600 hover:bg-red-700"
              : "bg-red-300 cursor-not-allowed"
          }`}
        >
          Confirm Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteCourseDialog;
