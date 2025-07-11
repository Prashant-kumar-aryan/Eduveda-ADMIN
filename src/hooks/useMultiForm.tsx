import React, { useState } from "react";
const useMultiForm = (steps: React.ReactNode[]) => {
  const [currentStep, setCurrentStep] = useState(0);
  const next = () => {
    // Logic to go to the next step
    if (steps.length > currentStep + 1) {
      setCurrentStep(currentStep + 1);
    }
  };
  const prev = () => {
    // Logic to go to the previous step
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };
  return {
    stepslength: steps.length,
    step: steps[currentStep],
    currentStep,
    islastStep: currentStep === steps.length - 1,
    isfirstStep: currentStep === 0,
    next,
    prev,
  };
};

export default useMultiForm;
