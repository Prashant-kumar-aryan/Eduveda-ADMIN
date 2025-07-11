import { forwardRef } from "react";
import React from "react";

interface dialogProps {
  children: React.ReactNode;
  toggleDialog: () => void;
}

const Dialog = forwardRef<HTMLDialogElement, dialogProps>(
  ({ children, toggleDialog }, ref) => {
    return (
      <dialog
        className="mx-auto w-full max-w-3xl m-10 rounded-2xl"
        ref={ref}
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            toggleDialog();
          }
        }}
      >
        {children}
      </dialog>
    );
  }
);

export default Dialog;
