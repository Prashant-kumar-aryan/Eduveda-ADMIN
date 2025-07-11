import React, { useState } from "react";
import Page1 from "./createCourse/Page1";
import useMultiForm from "../hooks/useMultiForm";
import Page2 from "./createCourse/Page2";
import Page3 from "./createCourse/Page3";

type page1Data = {
  title: string;
  subTitle: string;
  description: string;
  tags: string[];
  extras: {
    label: string;
    description: string;
  }[];
  overview: {
    bullets: string[];
  };
};

type page2Data = {
  file: File | null;
};

type instructorData = {
  name: string;
  title: string;
  experience: string;
  bio: string;
};

type page3Data = {
  originalPrice: number;
  discountPercent: number;
  currency: string;
  instructor: instructorData;
};

type courseData = page1Data & page2Data & page3Data;

const CreateCourseDialog = ({ toggleDialog }: { toggleDialog: () => void }) => {
  const inititalformData: courseData = {
    title: "",
    subTitle: "",
    description: "",
    tags: [],
    extras: [],
    overview: {
      bullets: [],
    },
    file: null,
    originalPrice: 0,
    discountPercent: 0,
    currency: "INR",
    instructor: {
      name: "",
      title: "",
      experience: "",
      bio: "",
    },
  };
  const [formData, setFormData] = useState<courseData>(inititalformData);
  const updateFeilds = (feilds: Partial<courseData>) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        ...feilds,
      };
    });
  };

  const {
    islastStep,
    prev,
    next,
    isfirstStep,
    step,
    currentStep,
    stepslength,
  } = useMultiForm([
    <Page1
      title={formData.title}
      subTitle={formData.subTitle}
      description={formData.description}
      tags={formData.tags}
      overview={formData.overview}
      updateFields={updateFeilds}
    />,
    <Page2 file={formData.file} updateFields={updateFeilds} />,
    <Page3
      originalPrice={formData.originalPrice}
      discountPercent={formData.discountPercent}
      currency={formData.currency}
      instructor={formData.instructor}
      updateFields={updateFeilds}
    />,
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (islastStep) {
      // Handle final submission logic here
      console.log("Course created!");
      console.log(formData);
      toggleDialog(); // Close dialog after submission
    } else {
      next(); // Move to the next step
    }
  };
  return (
    <div className=" mx-auto w-full max-w-3xl h-[90vh] shadow-2xl bg-white rounded overflow-hidden">
      {/* Fixed Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 border-b border-gray-300 bg-white z-10">
        <h2 className="text-2xl font-bold text-gray-700">Create Course</h2>
        <button
          onClick={toggleDialog}
          className="text-xl hover:scale-110 transition-transform"
        >
          ❌
        </button>
      </header>

      {/* Scrollable content */}
      <form
        onSubmit={handleSubmit}
        className="mt-[50px] mb-auto h-[78vh] flex flex-col"
      >
        {/* Scrollable area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">{step}</div>

        {/* Fixed Footer */}
        <footer className="absolute bottom-0 left-0 w-full flex items-center justify-between px-6 py-4 border-t border-gray-300 bg-white z-10 shadow-md">
          {/* Step Indicator */}
          <div className="text-sm text-gray-500">
            Step <span className="font-semibold">{currentStep + 1}</span> of{" "}
            <span className="font-semibold">{stepslength}</span>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded transition-colors duration-200 ${
                isfirstStep
                  ? "bg-gray-400 text-gray-500"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-700"
              }`}
              onClick={prev}
              disabled={isfirstStep}
              type="button"
            >
              ← Back
            </button>
            <button
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded transition-colors duration-200"
              type="submit"
            >
              {islastStep ? "🚀 Create Course" : "Next →"}
            </button>
          </div>
        </footer>
      </form>

      {/* Fixed Footer */}
    </div>
  );
};

export default CreateCourseDialog;
