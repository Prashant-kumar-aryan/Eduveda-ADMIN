import { forwardRef } from "react";
import React from "react";

interface dialogProps {
  children: React.ReactNode;
  toggleDialog: () => void;
  className: string;
}

const Dialog = forwardRef<HTMLDialogElement, dialogProps>(
  ({ children, toggleDialog, className }, ref) => {
    return (
      <dialog
        ref={ref}
        className={className}
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
