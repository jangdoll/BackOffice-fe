// components/Field.tsx
import React from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Field({ label, required, children, className = "" }: FieldProps) {
  return (
    <div className={`flex w-[25%] min-w-[180px] ${className}`}>
      <div className="flex items-center justify-center bg-gray-400 text-white text-xs font-semibold w-[72px] min-w-[72px] h-[30px] border border-gray-300">
        {required && <span className="text-red-500">*</span>} {label}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
