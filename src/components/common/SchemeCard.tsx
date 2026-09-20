import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldAlert,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  FileText,
  Building2,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { DemoScheme, SchemeMatchResult } from '../../types/scheme';
import { Button } from './Button';

interface SchemeCardProps {
  scheme: DemoScheme;
  matchResult?: SchemeMatchResult;
  onViewDetails: (schemeId: string) => void;
  onAskAI?: (schemeId: string) => void;
  showMatchBadge?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Education: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Agriculture: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Employment: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Women: { bg: 'bg-fuchsia-50', text: 'text-fuchsia-700', border: 'border-fuchsia-200' },
  Business: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Housing: { bg: 'bg-teal-50', text: 'text-teal-700', border: 'border-teal-200' },
  Healthcare: { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
  'Social Welfare': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' }
};

export const SchemeCard: React.FC<SchemeCardProps> = ({
  scheme,
  matchResult,
  onViewDetails,
  onAskAI,
  showMatchBadge = true
}) => {
  const [isEligibilityExpanded, setIsEligibilityExpanded] = useState(false);

  const colors = CATEGORY_COLORS[scheme.category] || {
    bg: 'bg-slate-50',
    text: 'text-slate-700',
    border: 'border-slate-200'
  };

  const percentage = matchResult?.matchPercentage || 75;
  const matchTier = matchResult?.matchTier || 'Potential Match';

  const badgeColor =
    percentage >= 80
      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
      : percentage >= 60
      ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
      : 'bg-amber-50 text-amber-700 border-amber-200';

  return (
    <div
      id={`scheme-card-${scheme.id}`}
      className="bg-white border border-slate-200/90 rounded-2xl p-5 md:p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between relative group hover:border-slate-300"
    >
      {/* Top Meta Header */}
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${colors.bg} ${colors.text} ${colors.border}`}
            >
              {scheme.category}
            </span>
            <span className="text-[11px] font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              Demo Scheme
            </span>
          </div>

          {showMatchBadge && (
            <div
              className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-lg border shadow-2xs ${badgeColor}`}
              title="Calculated affinity based on your demographic profile signals"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{percentage}% Profile Match</span>
            </div>
          )}
        </div>

        {/* Scheme Title */}
        <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
          {scheme.name}
        </h3>

        {/* Department */}
        <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 line-clamp-1">
          <Building2 className="w-3.5 h-3.5 shrink-0 text-slate-400" />
          <span>{scheme.department}</span>
        </p>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {scheme.shortDescription}
        </p>

        {/* Benefit Summary Box */}
        <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
          <div className="flex items-start gap-2">
            <span className="font-semibold text-slate-800 shrink-0">Benefit Summary:</span>
            <span className="text-slate-600 font-medium">{scheme.benefits.summary}</span>
          </div>
        </div>

        {/* "Why This May Match" Section */}
        {matchResult && matchResult.matchedReasons && matchResult.matchedReasons.length > 0 && (
          <div className="mt-3.5 p-3 rounded-xl bg-indigo-50/50 border border-indigo-100/80 text-xs">
            <div className="flex items-center gap-1.5 font-semibold text-indigo-900 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Why this may match:</span>
            </div>
            <ul className="space-y-1 text-slate-600">
              {matchResult.matchedReasons.slice(0, 2).map((reason, i) => (
                <li key={i} className="flex items-start gap-1.5 leading-snug">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Collapsible Quick Eligibility Criteria */}
        <div className="mt-3">
          <button
            type="button"
            id={`toggle-eligibility-${scheme.id}`}
            onClick={() => setIsEligibilityExpanded(!isEligibilityExpanded)}
            className="w-full flex items-center justify-between text-xs font-semibold text-slate-600 hover:text-slate-900 py-1 cursor-pointer transition-colors"
          >
            <span>View Eligibility Highlights</span>
            {isEligibilityExpanded ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {isEligibilityExpanded && (
            <div className="mt-2 p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs space-y-2">
              <div className="font-semibold text-slate-800">Eligibility Criteria:</div>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                {scheme.eligibility.criteriaList.map((crit, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {crit}
                  </li>
                ))}
              </ul>
              {scheme.documents && scheme.documents.length > 0 && (
                <div className="pt-2 border-t border-slate-200/60">
                  <div className="font-semibold text-slate-700 flex items-center gap-1 mb-1">
                    <FileText className="w-3 h-3 text-slate-400" /> Key Documents:
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {scheme.documents.slice(0, 3).map((doc, docIdx) => (
                      <span
                        key={docIdx}
                        className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer Notice & Actions */}
      <div className="mt-5 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mb-3.5">
          <ShieldAlert className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className="leading-tight">Demo data — official verification required</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            id={`btn-view-details-${scheme.id}`}
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={() => onViewDetails(scheme.id)}
            icon={<ArrowRight className="w-3.5 h-3.5" />}
            iconPosition="right"
          >
            View Details
          </Button>

          {onAskAI && (
            <button
              type="button"
              id={`btn-ask-ai-${scheme.id}`}
              onClick={() => onAskAI(scheme.id)}
              className="p-2 text-slate-600 hover:text-indigo-600 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors cursor-pointer"
              title="Ask AI Assistant about this scheme"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
