import React from "react";

interface ProgressIndicatorProps {
  currentStep: number; // 0 to 3
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
}) => {
  return (
    <div className="relative flex items-center justify-between w-full px-6 py-2">
      {[1, 2, 3].map((step, index) => (
        <React.Fragment key={index}>
          {/* Circle */}
          <div className="relative flex items-center">
            <div
              className={`w-5 h-5 rounded-full transition-all duration-300 flex justify-center items-center ${
                currentStep >= step ? "bg-purple-600" : "bg-neutral-400"
              }`}
            >
              {currentStep === step && (
                <div className="absolute w-7 h-7 bg-purple-600/40 rounded-full animate-ping" />
              )}
            </div>
          </div>

          {/* Connector Line (except for last step) */}
          {index < 2 && <div className="flex-1 h-1 bg-white opacity-50"></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default ProgressIndicator;
