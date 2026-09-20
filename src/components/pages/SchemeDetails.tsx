import React from 'react';
import {
  ArrowLeft,
  Building2,
  Sparkles,
  ShieldAlert,
  Calendar,
  ExternalLink,
  CheckCircle2,
  FileText,
  Layers,
  Check,
  MessageSquare,
  AlertCircle,
  Clock,
  Printer,
  Share2
} from 'lucide-react';
import { DemoScheme, UserProfile } from '../../types/scheme';
import { calculateSchemeMatch } from '../../services/matchingEngine';
import { Button } from '../common/Button';

interface SchemeDetailsProps {
  scheme: DemoScheme;
  profile: UserProfile | null;
  onBack: () => void;
  onAskAI: (schemeId: string) => void;
  onEditProfile: () => void;
}

export const SchemeDetails: React.FC<SchemeDetailsProps> = ({
  scheme,
  profile,
  onBack,
  onAskAI,
  onEditProfile
}) => {
  const matchResult = calculateSchemeMatch(scheme, profile);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8" id="scheme-details-page">
      {/* Top Navigation & Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          id="back-to-results-btn"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-indigo-600 bg-white border border-slate-200 px-3.5 py-2 rounded-xl shadow-2xs hover:bg-slate-50 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Matches / Directory</span>
        </button>

        <div className="flex items-center gap-2.5">
          <Button
            id="details-ask-ai-btn"
            variant="primary"
            size="sm"
            onClick={() => onAskAI(scheme.id)}
            icon={<MessageSquare className="w-4 h-4" />}
          >
            Ask AI About This Scheme
          </Button>
        </div>
      </div>

      {/* Prominent Mandatory Official Notice */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3 shadow-2xs">
        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="font-bold text-amber-950 block mb-0.5">Official Verification Notice:</strong>
          Verify eligibility and application details through the official government source before applying.
          SchemeMate AI is an informational discovery tool and does not guarantee eligibility, subsidy sanctions,
          or official approvals.
        </div>
      </div>

      {/* Main Header Information Card */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-6 md:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              {scheme.category}
            </span>
            <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
              Demo Scheme Placeholder
            </span>
          </div>

          {/* Match Score Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{matchResult.matchPercentage}% Profile Affinity ({matchResult.matchTier})</span>
          </div>
        </div>

        {/* Scheme Name */}
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {scheme.name}
        </h1>

        {/* Department Name */}
        <div className="mt-2.5 flex items-center gap-2 text-xs text-slate-600">
          <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
          <span className="font-medium">{scheme.department}</span>
        </div>

        {/* Verification and Source Metadata */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Last Verified: {scheme.lastVerified}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ExternalLink className="w-4 h-4 text-slate-400" />
            <span>Official Portal Reference: <span className="text-indigo-600 font-semibold">{scheme.officialSource.portalName}</span></span>
          </div>
        </div>
      </div>

      {/* Grid: 2 Columns (Main Details vs Personalized Match Analysis) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (2 Cols wide) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Section: Overview */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-600" />
              <span>Scheme Overview</span>
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* Section: Benefits */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600" />
              <span>Benefits Breakdown</span>
            </h2>

            {/* Benefit highlight card */}
            <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 mb-5">
              <span className="text-xs font-bold text-emerald-900 block mb-1">Financial Assistance:</span>
              <p className="text-base font-extrabold text-emerald-700">{scheme.benefits.summary}</p>
              {scheme.benefits.frequency && (
                <span className="text-xs text-emerald-800 mt-1 block">
                  Disbursement Frequency: {scheme.benefits.frequency}
                </span>
              )}
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Specific Benefit Inclusions:
            </h3>
            <ul className="space-y-2">
              {scheme.benefits.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Eligibility Criteria */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              <span>Eligibility Criteria</span>
            </h2>

            <ul className="space-y-3">
              {scheme.eligibility.criteriaList.map((crit, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-5 h-5 rounded-full bg-white border border-slate-200 text-slate-500 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{crit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section: Required Documents */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-600" />
              <span>Required Documents Checklist</span>
            </h2>
            <p className="text-xs text-slate-500 mb-4">
              Gather these documents before initiating your online submission:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {scheme.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-xs font-semibold text-slate-800"
                >
                  <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Application Process */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-600" />
              <span>Step-by-Step Application Process</span>
            </h2>

            <div className="space-y-4">
              {scheme.applicationProcess.map((step) => (
                <div key={step.step} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                      {step.step}
                    </div>
                    {step.step < scheme.applicationProcess.length && (
                      <div className="w-0.5 h-full bg-indigo-100 my-1" />
                    )}
                  </div>
                  <div className="pb-4">
                    <h3 className="text-sm font-bold text-slate-900 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Personalized Matching Card & Official Links */}
        <div className="space-y-6">
          {/* Personalized Matching Insights */}
          <div className="bg-white border border-indigo-100 rounded-2xl p-6 shadow-xs sticky top-24">
            <div className="flex items-center gap-2 text-indigo-700 font-bold text-sm mb-3">
              <Sparkles className="w-4 h-4" />
              <span>Why This Matches You</span>
            </div>

            <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100 mb-4 text-xs">
              <div className="font-bold text-indigo-900 mb-1">
                Match Score: {matchResult.matchPercentage}%
              </div>
              <p className="text-slate-600">
                Calculated based on your active citizen profile demographic signals.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <h3 className="font-bold text-slate-800">Matching Demographic Points:</h3>
              <ul className="space-y-2">
                {matchResult.matchedReasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-slate-700 leading-snug">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>

              {matchResult.verificationNotes.length > 0 && (
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <h3 className="font-bold text-amber-800 flex items-center gap-1.5 mb-2">
                    <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                    <span>Check Before Applying:</span>
                  </h3>
                  <ul className="space-y-1.5 text-slate-600">
                    {matchResult.verificationNotes.map((note, idx) => (
                      <li key={idx} className="text-[11px] leading-relaxed">
                        • {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Official Source & Application Portal Placeholder */}
            <div className="mt-6 pt-5 border-t border-slate-100 space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Official Submission Channel
              </h3>
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl text-xs space-y-1.5">
                <span className="font-semibold text-slate-800 block">
                  {scheme.officialSource.portalName}
                </span>
                <span className="text-[11px] text-slate-500 font-mono block break-all">
                  {scheme.officialSource.urlPlaceholder}
                </span>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-[11px] text-indigo-700 font-bold bg-white border border-slate-200 px-2.5 py-1 rounded-md">
                    <ExternalLink className="w-3 h-3" />
                    Official Portal (Demo Link)
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-5 space-y-2">
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                onClick={onEditProfile}
              >
                Modify My Profile Signals
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
