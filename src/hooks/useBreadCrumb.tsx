import { useState } from "react";

const useBreadCrumb = () => {
  const [header, setHeader] = useState<string>("");

  return {
    header,
    setHeader,
  };
};

export default useBreadCrumb;
