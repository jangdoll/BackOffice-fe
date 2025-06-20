// components/ProgramGrid.tsx
import React from "react";

// 만약 부모가 flex-col(세로)이고, ProgramGrid가 main 컨텐츠라면 flex-1로!
export function ProgramGrid() {
  return (
    <section className="w-full rounded border border-gray-200 bg-white mb-2 shadow-sm flex flex-col flex-1 min-h-0">
      <div className="flex items-center px-3 py-2 border-b bg-gray-50">
        <span className="font-semibold text-sm text-gray-700">프로그램 목록</span>
      </div>
      {/* 이 영역이 flex-1이므로 아래로 쫙~ */}
      <div className="flex-1 min-h-[140px] text-gray-400 flex items-center justify-center">
        {/* 실제 그리드 라이브러리 연결 or 데이터 매핑 */}
        그리드 영역 (미구현)
      </div>
    </section>
  );
}
