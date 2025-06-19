// components/SearchView.tsx
import React from "react";

export function SearchView() {
  return (
    <section className="mb-2 border rounded bg-gray-50 px-3 py-2">
      <div className="flex gap-3 mb-2">
        <div>
          <label className="block text-xs text-gray-600">언어</label>
          <select className="border rounded px-2 py-1 text-sm min-w-[120px]"><option>Korean</option></select>
        </div>
        <div>
          <label className="block text-xs text-gray-600">업무구분</label>
          <select className="border rounded px-2 py-1 text-sm min-w-[120px]"><option>::: ALL :::</option></select>
        </div>
        <div>
          <label className="block text-xs text-gray-600">기능구분</label>
          <select className="border rounded px-2 py-1 text-sm min-w-[120px]"><option>::: ALL :::</option></select>
        </div>
        <div>
          <label className="block text-xs text-gray-600">프로그램명</label>
          <input className="border rounded px-2 py-1 text-sm min-w-[120px]" type="text" />
        </div>
      </div>
    </section>
  );
}
