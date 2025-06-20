// components/SearchView.tsx
import React, { useState } from "react";
import { Field } from "./Field";

export function SearchView() {
  // 예시: 상태값
  const [lang, setLang] = useState("Korean");
  const [biz, setBiz] = useState("");
  const [func, setFunc] = useState("");
  const [pgmNm, setPgmNm] = useState("");

  return (
    <section className="mb-2 rounded border border-gray-200 bg-white">
      <form className="w-full">
        <div className="flex gap-2">
          <Field label="언어">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={lang}
              onChange={e => setLang(e.target.value)}
            >
              <option value="Korean">Korean</option>
            </select>
          </Field>
          <Field label="업무구분">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={biz}
              onChange={e => setBiz(e.target.value)}
            >
              <option value="">::: ALL :::</option>
              <option value="SS">시스템관리</option>
              <option value="CM">공통업무</option>
              <option value="HQ">본부운영</option>
              <option value="ED">거래처EDI</option>
              <option value="WM">물류운영</option>
              <option value="ST">점포운영</option>
              <option value="PS">POS관리</option>
              <option value="OM">영업관리</option>
              <option value="OS">영업지원</option>
              <option value="VE">협력사EDI</option>
            </select>
          </Field>
          <Field label="기능구분">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={func}
              onChange={e => setFunc(e.target.value)}
            >
              <option value="">::: ALL :::</option>
              <option value="1">관리기능</option>
              <option value="2">조회전용</option>
              <option value="3">배치전용</option>
              <option value="4">인쇄전용</option>
              <option value="5">메인화면</option>
            </select>
          </Field>
          <Field label="프로그램명">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={pgmNm}
              onChange={e => setPgmNm(e.target.value)}
            />
          </Field>
        </div>
      </form>
    </section>
  );
}
