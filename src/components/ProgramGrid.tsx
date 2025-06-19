// components/ProgramGrid.tsx
import React from "react";
import { FiFileText } from "react-icons/fi";

export function ProgramGrid() {
  return (
    <section className="border rounded bg-white px-2 py-2">
      <h3 className="font-semibold text-lg mb-2 flex items-center">
        <FiFileText className="mr-2 text-[#19528c]" />프로그램 목록
      </h3>
      <div className="overflow-auto border-t">
        <table className="min-w-full text-center text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 border">프로그램ID</th>
              <th className="px-2 py-1 border">프로그램명</th>
              <th className="px-2 py-1 border">업무구분</th>
              <th className="px-2 py-1 border">프로그램유형</th>
              <th className="px-2 py-1 border">용도구분</th>
              <th className="px-2 py-1 border">기능구분</th>
              <th className="px-2 py-1 border">사용여부</th>
              <th className="px-2 py-1 border">URL</th>
            </tr>
          </thead>
          <tbody>
            {/* 예시 데이터 */}
            <tr>
              <td className="px-2 py-1 border">BASS2000100</td>
              <td className="px-2 py-1 border">프로그램 관리</td>
              <td className="px-2 py-1 border">시스템관리</td>
              <td className="px-2 py-1 border">window</td>
              <td className="px-2 py-1 border">일반</td>
              <td className="px-2 py-1 border">관리기능</td>
              <td className="px-2 py-1 border">Y</td>
              <td className="px-2 py-1 border">/pgm/manage</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
