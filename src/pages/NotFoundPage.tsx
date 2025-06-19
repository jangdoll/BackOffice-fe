// src/pages/NotFoundPage.tsx

import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[500px] bg-gray-50">
      <svg
        width="80"
        height="80"
        fill="none"
        viewBox="0 0 64 64"
        className="mb-6 text-gray-300"
      >
        <circle cx="32" cy="32" r="32" fill="#F3F4F6" />
        <path
          d="M40.5 41.5c0 3.866-3.134 7-7 7s-7-3.134-7-7"
          stroke="#d1d5db"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <ellipse
          cx="24"
          cy="28"
          rx="2"
          ry="3"
          fill="#d1d5db"
        />
        <ellipse
          cx="40"
          cy="28"
          rx="2"
          ry="3"
          fill="#d1d5db"
        />
        <rect x="24" y="48" width="16" height="2" rx="1" fill="#d1d5db" />
      </svg>
      <h1 className="text-2xl font-bold text-gray-600 mb-2">페이지를 찾을 수 없습니다</h1>
      <p className="text-gray-500 mb-6">요청하신 페이지가 존재하지 않거나 이동되었습니다.</p>
      <button
        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition"
        onClick={() => navigate('/')}
      >
        홈으로 이동
      </button>
    </div>
  );
}
