import React from 'react';

interface FormFieldProps {
  id: string;
  label: string;
  description?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  id,
  label,
  description,
  error,
  required,
  children,
  className = ''
}) => {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="block text-sm font-semibold text-slate-800"
        >
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      </div>

      {description && (
        <p className="text-xs text-slate-500 leading-relaxed">{description}</p>
      )}

      <div className="pt-0.5">{children}</div>

      {error && (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
          {error}
        </p>
      )}
    </div>
  );
};
