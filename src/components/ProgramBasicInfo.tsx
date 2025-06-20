// components/ProgramBasicInfo.tsx
import React, { useState } from "react";
import { Field } from "./Field";

// 옵션 데이터는 동일(생략 가능)
const BIZ_OPTIONS = [
  { value: "SS", label: "시스템관리" },
  { value: "CM", label: "공통업무" },
  { value: "HQ", label: "본부운영" },
  { value: "ED", label: "거래처EDI" },
  { value: "WM", label: "물류운영" },
  { value: "ST", label: "점포운영" },
  { value: "PS", label: "POS관리" },
  { value: "OM", label: "영업관리" },
  { value: "OS", label: "영업지원" },
  { value: "VE", label: "협력사EDI" },
];
const PGM_TYPE_OPTIONS = [
  { value: "W", label: "window" },
  { value: "P", label: "pop-up window" },
  { value: "F", label: "pop-up search" },
];
const PURPOSE_OPTIONS = [
  { value: "1", label: "일반" },
  { value: "2", label: "POS" },
  { value: "3", label: "SRM" },
];
const FUNC_OPTIONS = [
  { value: "1", label: "관리기능" },
  { value: "2", label: "조회전용" },
  { value: "3", label: "배치전용" },
  { value: "4", label: "인쇄전용" },
  { value: "5", label: "메인화면" },
];

export function ProgramBasicInfo() {
  // 상태값은 동일(생략)
  const [pgmId, setPgmId] = useState("");
  const [pgmNm, setPgmNm] = useState("");
  const [biz, setBiz] = useState("");
  const [pgmType, setPgmType] = useState("W");
  const [purpose, setPurpose] = useState("1");
  const [func, setFunc] = useState("1");
  const [useYn, setUseYn] = useState(true);
  const [url, setUrl] = useState("");

  const [stdBtns, setStdBtns] = useState({
    inq: false, new: false, ins: false, del: false, xls: false, prt: false,
  });
  const [mngBtns, setMngBtns] = useState({
    appreq: false, reqcnc: false, appprc: false, docdsu: false, down: false, upload: false, statnq: false,
  });

  return (
    <section className="mb-1 rounded border border-gray-200 bg-white">
      {/* 타이틀 영역 */}
      <div className="flex items-center px-3 py-2 border-b bg-gray-50">
        <span className="font-semibold text-sm text-gray-700">프로그램기본정보</span>
      </div>
      {/* 폼 본문 */}
      <form className="w-full space-y-1">
        {/* 1행 */}
        <div className="flex gap-1">
          <Field label="프로그램ID" required>
            <input
              type="text"
              value={pgmId}
              onChange={e => setPgmId(e.target.value)}
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] bg-gray-100 focus:outline-[#2563eb]"
              maxLength={50}
              readOnly
            />
          </Field>
          <Field label="프로그램명" required>
            <input
              type="text"
              value={pgmNm}
              onChange={e => setPgmNm(e.target.value)}
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              maxLength={50}
            />
          </Field>
          <Field label="업무구분">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={biz}
              onChange={e => setBiz(e.target.value)}
            >
              {BIZ_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="프로그램유형">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={pgmType}
              onChange={e => setPgmType(e.target.value)}
            >
              {PGM_TYPE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
        </div>
        {/* 2행 */}
        <div className="flex gap-1">
          <Field label="용도구분">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={purpose}
              onChange={e => setPurpose(e.target.value)}
            >
              {PURPOSE_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="기능구분">
            <select
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              value={func}
              onChange={e => setFunc(e.target.value)}
            >
              {FUNC_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </Field>
          <Field label="사용여부">
            <div className="flex items-center h-[30px] pl-2">
              <input
                type="checkbox"
                checked={useYn}
                onChange={e => setUseYn(e.target.checked)}
                className="mr-1"
              /> <span className="text-xs">사용</span>
            </div>
          </Field>
          <Field label="URL" required>
            <input
              type="text"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
              maxLength={200}
            />
          </Field>
        </div>
        {/* 3행: 기준버튼 */}
        <div className="flex gap-1">
          <div className="flex w-full">
            <div className="flex items-center justify-center bg-gray-400 text-white text-xs font-semibold w-[72px] min-w-[72px] h-[30px] border border-gray-300">
              기준버튼
            </div>
            <div className="flex items-center px-2 bg-gray-50 h-[30px] border border-gray-300 flex-1">
              {[
                { key: "inq", label: "조회" },
                { key: "new", label: "신규" },
                { key: "ins", label: "저장" },
                { key: "del", label: "삭제" },
                { key: "xls", label: "엑셀" },
                { key: "prt", label: "출력" },
              ].map(btn => (
                <label key={btn.key} className="mr-3 flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={stdBtns[btn.key as keyof typeof stdBtns]}
                    onChange={e => setStdBtns(s => ({ ...s, [btn.key]: e.target.checked }))}
                    className="mr-1"
                  />
                  {btn.label}
                </label>
              ))}
            </div>
          </div>
        </div>
        {/* 4행: 관리버튼 */}
        <div className="flex gap-1">
          <div className="flex w-full">
            <div className="flex items-center justify-center bg-gray-400 text-white text-xs font-semibold w-[72px] min-w-[72px] h-[30px] border border-gray-300">
              관리버튼
            </div>
            <div className="flex items-center px-2 bg-gray-50 h-[30px] border border-gray-300 flex-1">
              {[
                { key: "appreq", label: "승인요청" },
                { key: "reqcnc", label: "요청취소" },
                { key: "appprc", label: "결제처리" },
                { key: "docdsu", label: "문서폐기" },
                { key: "down", label: "다운로드" },
                { key: "upload", label: "업로드" },
                { key: "statnq", label: "확정" },
              ].map(btn => (
                <label key={btn.key} className="mr-3 flex items-center text-xs">
                  <input
                    type="checkbox"
                    checked={mngBtns[btn.key as keyof typeof mngBtns]}
                    onChange={e => setMngBtns(s => ({ ...s, [btn.key]: e.target.checked }))}
                    className="mr-1"
                  />
                  {btn.label}
                </label>
              ))}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
