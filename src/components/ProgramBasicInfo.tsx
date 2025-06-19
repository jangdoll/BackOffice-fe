// components/ProgramBasicInfo.tsx
import React from "react";
import { FiFileText } from "react-icons/fi";

export function ProgramBasicInfo() {
  return (
    <section className="mb-3 border rounded bg-white px-4 py-3">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <FiFileText className="mr-2 text-[#19528c]" />프로그램기본정보
      </h3>
      <div className="grid grid-cols-4 gap-4 mb-2">
        {/* 각각의 입력필드 */}
        <div>
          <label className="text-xs font-semibold">프로그램ID <span className="text-red-500">*</span></label>
          <input type="text" className="border rounded w-full px-2 py-1 text-sm bg-gray-100" readOnly />
        </div>
        <div>
          <label className="text-xs font-semibold">프로그램명 <span className="text-red-500">*</span></label>
          <input type="text" className="border rounded w-full px-2 py-1 text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold">업무구분</label>
          <select className="border rounded w-full px-2 py-1 text-sm"><option>시스템관리</option></select>
        </div>
        <div>
          <label className="text-xs font-semibold">프로그램유형</label>
          <select className="border rounded w-full px-2 py-1 text-sm"><option>window</option></select>
        </div>
      </div>
      {/* 기타 영역도 유사하게 */}
      {/* ... */}
    </section>
  );
}
