import React, { cloneElement, isValidElement, type ReactNode } from "react";

interface FieldProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  minWidth?: number;
}

const COMMON_INPUT_CLASS = `
  w-full border border-gray-200 rounded-r
  px-2 py-1 text-xs h-[32px] bg-white
  focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]
  transition shadow-sm
`;

export function Field({ label, required, children, className = "", minWidth = 90 }: FieldProps) {
  let renderedChild = children;
  if (isValidElement(children)) {
    // 여기서 children을 ReactElement로 단언
    const element = children as React.ReactElement<any, any>;
    renderedChild = cloneElement(element, {
      className: [element.props.className, COMMON_INPUT_CLASS].filter(Boolean).join(" "),
    });
  }

  return (
    <div className={`flex items-center w-[25%] min-w-[180px] gap-1 ${className}`}>
      <label
        className="
          flex-shrink-0 flex items-center justify-center
          px-2 h-[32px]
          text-xs font-semibold
          bg-gray-300 border border-gray-400 rounded-l
          text-gray-800
          whitespace-nowrap
        "
        style={{ minWidth: minWidth }}
      >
        {required && <span className="text-red-500 mr-1">*</span>}
        {label}
      </label>
      <div className="flex-1">
        {renderedChild}
      </div>
    </div>
  );
}
