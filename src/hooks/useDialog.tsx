import { useRef } from "react";

const useDialog = () => {
  const ref = useRef<HTMLDialogElement>(null);

  const toggleDialog = () => {
    if (!ref.current) return;

    ref.current.hasAttribute("open")
      ? ref.current.close()
      : ref.current.showModal();
  };

  return {
    ref,
    toggleDialog,
  };
};

export default useDialog;
