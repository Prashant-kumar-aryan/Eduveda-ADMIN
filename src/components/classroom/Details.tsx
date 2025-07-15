import ConfirmDialog from "../popUps/ConfirmPopUp";
import Dialog from "../popUps/Dialog";
import useDialog from "../../hooks/useDialog";
// Adjust the path to your Dialog file

const Details = () => {
  // const dialogref = useRef<HTMLDialogElement>(null);
  const { ref, toggleDialog } = useDialog();

  const handleConfirm = () => {
    console.log("Confirmed action");
    toggleDialog();
  };

  const handleCancel = () => {
    console.log("Cancelled");
    toggleDialog();
  };

  return (
    <div className="w-full bg-amber-600 p-6">
      <button
        onClick={toggleDialog}
        className="bg-white px-4 py-2 rounded shadow hover:bg-gray-200"
      >
        Open Confirm Dialog
      </button>

      <Dialog
        ref={ref}
        toggleDialog={toggleDialog}
        className="mx-auto w-full max-w-3xl mt-5 rounded-sm"
      >
        <ConfirmDialog
          text="Are you sure you want to perform this action?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Dialog>
    </div>
  );
};

export default Details;
