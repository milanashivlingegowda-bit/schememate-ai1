import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  Cpu,
  Search,
  ShieldCheck,
  FileCheck,
  Layers,
  ArrowRight
} from 'lucide-react';
import { UserProfile } from '../../types/scheme';
import { Button } from '../common/Button';

interface ProcessingScreenProps {
  profile: UserProfile;
  onComplete: () => void;
}

const PROCESSING_STEPS = [
  { id: 1, text: 'Analyzing your demographic profile...', detail: 'Verifying age, domicile state, and occupation tags' },
  { id: 2, text: 'Scanning Central & State welfare initiatives...', detail: 'Filtering 150+ central ministries and state directorates' },
  { id: 3, text: 'Evaluating socio-economic criteria and income caps...', detail: 'Cross-referencing category quotas and financial tiers' },
  { id: 4, text: 'Computing weighted eligibility scores & reasons...', detail: 'Synthesizing tailored "Why this may match" rationales' }
];

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({
  profile,
  onComplete
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(15);

  useEffect(() => {
    // Step 1
    const timer1 = setTimeout(() => {
      setCurrentStepIndex(1);
      setProgress(40);
    }, 600);

    // Step 2
    const timer2 = setTimeout(() => {
      setCurrentStepIndex(2);
      setProgress(70);
    }, 1300);

    // Step 3
    const timer3 = setTimeout(() => {
      setCurrentStepIndex(3);
      setProgress(95);
    }, 2000);

    // Complete
    const timer4 = setTimeout(() => {
      setProgress(100);
      onComplete();
    }, 2700);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [onComplete]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12" id="processing-screen-container">
      <div className="w-full max-w-lg bg-white border border-slate-200/90 rounded-3xl p-8 md:p-10 shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Central Graphic: Animated Radar Pulse */}
        <div className="relative mx-auto w-24 h-24 mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-indigo-100 animate-ping opacity-60" />
          <div className="absolute -inset-2 rounded-full border-2 border-indigo-200/70 border-dashed animate-spin duration-3000" />
          <div className="relative w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/30">
            <Cpu className="w-8 h-8 animate-pulse" />
          </div>
        </div>

        {/* Dynamic Title */}
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full mb-3 border border-indigo-200/80">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Demo Matching Engine Active</span>
        </div>

        <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">
          Finding Potentially Relevant Schemes
        </h2>

        <p className="text-xs text-slate-500 mt-2 max-w-md mx-auto">
          Scanning demo catalog for {profile.state ? `${profile.state} residents` : 'citizens'} matching your profile parameters...
        </p>

        {/* Progress Bar */}
        <div className="mt-8 mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-2">
            <span>Analyzing criteria</span>
            <span className="text-indigo-600 font-bold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Dynamic Step Checklist */}
        <div className="text-left space-y-3.5 py-4 border-t border-slate-100">
          {PROCESSING_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-3 text-xs transition-opacity duration-200 ${
                  isCurrent
                    ? 'text-indigo-900 font-semibold'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400 opacity-60'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : isCurrent ? (
                    <div className="w-4 h-4 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-slate-300" />
                  )}
                </div>
                <div>
                  <div className="leading-snug">{step.text}</div>
                  {isCurrent && (
                    <div className="text-[11px] text-slate-500 font-normal mt-0.5">
                      {step.detail}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Skip button for instant navigation */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            id="skip-processing-btn"
            onClick={onComplete}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center justify-center gap-1 mx-auto cursor-pointer"
          >
            <span>View Results Instantly</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
