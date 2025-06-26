import React, { useMemo, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry } from "ag-grid-community";
import * as agGridCommunity from "ag-grid-community";

// 모듈 등록
ModuleRegistry.registerModules([
  agGridCommunity.ClientSideRowModelModule,
  agGridCommunity.TextEditorModule,
  agGridCommunity._SharedRowSelectionModule,
  agGridCommunity.RowStyleModule,
  agGridCommunity.CellStyleModule,
  agGridCommunity.CheckboxEditorModule,
  agGridCommunity.PaginationModule,
  agGridCommunity.CellSpanModule
]);

type ProgramRow = {
  pgmId: string;
  pgmNm: string;
  sysBizTp: string;
  useYn: boolean;
};

const initialRows: ProgramRow[] = [
  { pgmId: "A", pgmNm: "메뉴관리"  , sysBizTp: "시스템관리", useYn: true  },
  { pgmId: "C", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "D", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "E", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "G", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "H", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "F", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "I", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "K", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "J", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "L", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "N", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "M", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "P", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "O", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "C", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "D", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "E", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "G", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "H", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "F", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "I", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "K", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "J", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: true  },
  { pgmId: "L", pgmNm: "권한관리"  , sysBizTp: "공통업무2"  , useYn: false },
  { pgmId: "N", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "M", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "P", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "O", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "C", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "D", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "E", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "G", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "H", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "F", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "I", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "K", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "J", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "L", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "N", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "M", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "P", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "O", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: false },
  { pgmId: "C", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무3"  , useYn: false },
  { pgmId: "D", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "E", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "G", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: false },
  { pgmId: "H", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "F", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "I", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "K", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: false },
  { pgmId: "J", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "L", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: false },
  { pgmId: "N", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "M", pgmNm: "권한관리"  , sysBizTp: "공통업무3"  , useYn: true  },
  { pgmId: "P", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "O", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "C", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "D", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "E", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "G", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "H", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "F", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "I", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "K", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "J", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "L", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "N", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "M", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "P", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "O", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "C", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "B", pgmNm: "사용자관리", sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "D", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "E", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "G", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "H", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "F", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "I", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "K", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "J", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "L", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  { pgmId: "N", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "M", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "P", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: true  },
  { pgmId: "O", pgmNm: "권한관리"  , sysBizTp: "공통업무"  , useYn: false },
  // ...더미 데이터 추가
];

export function ProgramGrid() {
  const [rows, setRows] = useState<ProgramRow[]>(initialRows);
  const [editedIds, setEditedIds] = useState<string[]>([]);

  const columns = useMemo<agGridCommunity.ColDef<ProgramRow>[]>(() => [
    {
      headerName: "",
      valueGetter: "node.rowIndex + 1",
      width: 55,
      maxWidth: 55,
      cellClass: "ag-number-cell", // (옵션) 번호셀 구분용
      pinned: "left",
      cellStyle: { textAlign: "center" },
      sortable: false
    },
    { headerName: "프로그램ID", field: "pgmId"   , flex: 1, editable: true },
    { headerName: "프로그램명", field: "pgmNm"   , flex: 1 },
    { headerName: "업무구분"  , field: "sysBizTp", flex: 1 , spanRows: true,
      // cellStyle: { textAlign: "center" }
    },
    { headerName: "사용여부"  , field: "useYn"   , flex: 1,  editable: true,
      cellEditor: "agCheckboxCellEditor",
      cellRenderer: "agCheckboxCellRenderer",
      cellClass: "ag-center-cell"
    }
  ], []);

  // 셀 수정 시 호출
  const onCellValueChanged = (params: any) => {
    const id = params.node.id; // 고유 id(혹은 다른 PK)
    if (!editedIds.includes(id)) setEditedIds(prev => [...prev, id]);
    setEditedIds(prev => [...prev, id]);

  };

  // row에 클래스 부여 (수정됨 표시)
  const getRowClass = (params: any) => {
    return editedIds.includes(params.node.id) ? "ag-row-edited" : "";
  };

  return (
    <section className="w-full h-full flex flex-col rounded border border-gray-200 bg-white mb-2 shadow-sm overflow-hidden flex-1 min-h-0">
      <div className="flex items-center px-3 py-2 border-b bg-gray-50 flex-shrink-0">
        <span className="font-semibold text-sm text-gray-700">프로그램 목록</span>
      </div>
      <div className="flex-1 min-h-0">
        <div className="ag-theme-alpine h-full w-full">
          <AgGridReact
            rowData={rows}
            columnDefs={columns}
            domLayout="normal" 
            rowSelection="single"    
            getRowClass={getRowClass}
            onCellValueChanged={onCellValueChanged}
            // enableCellSpan={true}
            pagination={true}
            paginationPageSizeSelector={false}
            paginationAutoPageSize={true}
          />
        </div>
      </div>
    </section>
  );
}
