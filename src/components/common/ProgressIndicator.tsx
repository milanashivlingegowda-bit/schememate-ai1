import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  shortTitle: string;
}

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
  onStepClick?: (step: number) => void;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
  steps,
  onStepClick
}) => {
  const progressPercentage = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);

  return (
    <div className="w-full" id="profile-progress-indicator">
      {/* Mobile step display */}
      <div className="flex sm:hidden items-center justify-between mb-3 text-xs">
        <span className="font-semibold text-indigo-700">
          Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.shortTitle}
        </span>
        <span className="text-slate-500 font-medium">{progressPercentage}% Complete</span>
      </div>

      {/* Progress Track */}
      <div className="relative mb-6">
        <div className="overflow-hidden h-2 text-xs flex rounded-full bg-slate-100">
          <div
            style={{ width: `${progressPercentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-600 transition-all duration-300 ease-out"
          />
        </div>

        {/* Stepper Dots (Desktop & Tablet) */}
        <div className="hidden sm:flex justify-between items-center absolute -top-2.5 left-0 right-0 px-1">
          {steps.map((step) => {
            const isCompleted = step.number < currentStep;
            const isCurrent = step.number === currentStep;

            return (
              <button
                key={step.number}
                type="button"
                id={`wizard-step-${step.number}`}
                onClick={() => isCompleted && onStepClick && onStepClick(step.number)}
                disabled={!isCompleted}
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold transition-all ${
                  isCompleted
                    ? 'bg-indigo-600 text-white cursor-pointer hover:bg-indigo-700'
                    : isCurrent
                    ? 'bg-white border-2 border-indigo-600 text-indigo-600 shadow-sm ring-4 ring-indigo-50'
                    : 'bg-white border-2 border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
                title={step.title}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : step.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Stepper Labels (Desktop) */}
      <div className="hidden sm:flex justify-between text-xs mt-3">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div
              key={step.number}
              className={`text-center max-w-[110px] ${
                isCurrent
                  ? 'font-bold text-indigo-700'
                  : isCompleted
                  ? 'font-medium text-slate-700'
                  : 'text-slate-400'
              }`}
            >
              {step.title}
            </div>
          );
        })}
      </div>
    </div>
  );
};
