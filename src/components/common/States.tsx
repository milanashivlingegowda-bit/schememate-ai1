import React from 'react';
import { SearchX, AlertCircle, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';
import { Button } from './Button';

interface LoadingStateProps {
  message?: string;
  subtext?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading government welfare schemes...',
  subtext = 'Fetching verified criteria from the demo knowledge repository'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-slate-200/80 shadow-xs" id="schemes-loading-state">
      <div className="relative mb-4">
        <div className="w-12 h-12 rounded-full border-3 border-indigo-100 border-t-indigo-600 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
        </div>
      </div>
      <h3 className="text-base font-semibold text-slate-800">{message}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-sm">{subtext}</p>
    </div>
  );
};

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No schemes found',
  description = 'Try adjusting your search keywords, clearing category filters, or broadening your eligibility parameters.',
  actionText = 'Reset Filters',
  onAction,
  secondaryActionText,
  onSecondaryAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-2xl border border-dashed border-slate-200 shadow-xs" id="schemes-empty-state">
      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 mb-4 border border-slate-100">
        <SearchX className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-slate-800">{title}</h3>
      <p className="text-xs text-slate-500 mt-1 max-w-md leading-relaxed">{description}</p>
      <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
        {onAction && (
          <Button variant="primary" size="sm" onClick={onAction} icon={<RefreshCw className="w-3.5 h-3.5" />}>
            {actionText}
          </Button>
        )}
        {secondaryActionText && onSecondaryAction && (
          <Button variant="outline" size="sm" onClick={onSecondaryAction} icon={<ArrowRight className="w-3.5 h-3.5" />} iconPosition="right">
            {secondaryActionText}
          </Button>
        )}
      </div>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Unable to evaluate scheme criteria',
  message = 'An unexpected issue occurred while fetching eligibility scores. You can retry the request or explore the full scheme repository.',
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center bg-rose-50/50 rounded-2xl border border-rose-200 shadow-xs" id="schemes-error-state">
      <div className="w-12 h-12 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 mb-4">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-rose-900">{title}</h3>
      <p className="text-xs text-rose-700 mt-1 max-w-md">{message}</p>
      {onRetry && (
        <div className="mt-5">
          <Button variant="primary" size="sm" onClick={onRetry} icon={<RefreshCw className="w-3.5 h-3.5" />}>
            Retry Evaluation
          </Button>
        </div>
      )}
    </div>
  );
};
