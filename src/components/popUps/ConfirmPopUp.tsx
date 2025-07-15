import React from "react";

interface ConfirmPopUpProps {
  text?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmPopUp: React.FC<ConfirmPopUpProps> = ({
  text = "Are you sure you want to continue?",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded shadow-xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Confirm Action
      </h2>
      <p className="mb-6 text-gray-700 dark:text-gray-300">{text}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded text-gray-800 dark:text-white"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmPopUp;
