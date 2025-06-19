import type { ComponentType } from "react";

const COLOR_MAP: Record<string, string> = {
  "btn-blue": "bg-blue-500 hover:bg-blue-600 text-white border-blue-600",
  "btn-green": "bg-green-500 hover:bg-green-600 text-white border-green-600",
  "btn-red": "bg-red-500 hover:bg-red-600 text-white border-red-500",
  "btn-gray": "bg-gray-300 hover:bg-gray-400 text-gray-800 border-gray-400",
};

export function PageButton({
  label,
  icon: Icon,
  color = "btn-blue",
  onClick,
}: {
  label: string;
  icon: ComponentType<any>;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`
        flex items-center px-2 py-0.5 rounded-md
        text-sm font-semibold
        border-2 shadow-sm
        focus:outline-none focus:ring-2 focus:ring-offset-2
        ${COLOR_MAP[color] ?? COLOR_MAP["btn-blue"]}
      `}
      type="button"
      onClick={onClick}
    >
      <Icon className="mr-1" />
      {label}
    </button>
  );
}
