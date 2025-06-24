import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import * as agGridCommunity from "ag-grid-community";
// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "/src/styles/ag-custom.css";

// 모듈 등록
ModuleRegistry.registerModules([
  agGridCommunity.ClientSideRowModelModule,
  agGridCommunity.TextEditorModule,
  agGridCommunity._SharedRowSelectionModule,
  agGridCommunity.ClientSideRowModelModule
]);

type ProgramRow = {
  pgmId: string;
  pgmNm: string;
  sysBizTp: string;
  useYn: string;
};

export function ProgramGrid() {
  const columns = useMemo<agGridCommunity.ColDef<ProgramRow>[]>(() => [
    {
      headerName: "#",
      valueGetter: "node.rowIndex + 1",
      width: 50,
      maxWidth: 50,
      cellClass: "ag-number-cell", // (옵션) 번호셀 구분용
      pinned: "left"
    },
    { headerName: "프로그램ID", field: "pgmId", flex: 1, editable: true },
    { headerName: "프로그램명", field: "pgmNm", flex: 1 },
    { headerName: "업무구분", field: "sysBizTp", flex: 1 },
    { headerName: "사용여부", field: "useYn", flex: 1 },
  ], []);

  const rows = useMemo<ProgramRow[]>(() => [
    { pgmId: "A", pgmNm: "메뉴관리", sysBizTp: "시스템관리", useYn: "Y" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무", useYn: "N" },
    // ...더미 데이터 추가 가능
  ], []);

  return (
    <section className="w-full h-full flex flex-col rounded border border-gray-200 bg-white mb-2 shadow-sm overflow-hidden flex-1 min-h-0">
      <div className="flex items-center px-3 py-2 border-b bg-gray-50 flex-shrink-0">
        <span className="font-semibold text-base text-gray-800">프로그램 목록</span>
      </div>
      {/* 아래 래퍼에 flex-1 min-h-0 추가 */}
      <div className="flex-1 min-h-0">
        <div className="ag-theme-alpine h-full w-full">
          <AgGridReact<ProgramRow>
            rowData={rows}
            columnDefs={columns}
            domLayout="normal" // autoHeight X
            rowSelection="single"    // 추가!
          />
        </div>
      </div>
    </section>
  );
}
