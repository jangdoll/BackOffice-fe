import React, { useEffect, useMemo, useRef } from "react";
import { useProgramFilter } from "../store/useProgramFilter";
import { PageToolbar } from "../components/PageToolbar";
import { Field } from "../components/Field";
import { useApiMutation } from "../hooks/useApiMutation";
import { makeSelectOptions } from "../utils/makeSelectOptions";
import { useCommonCode } from "../hooks/useCommonCode";
import SelectBox from "../components/SelectBox";
import AUIGrid from "../components/AUIGridReact";
import * as IGrid from 'aui-grid';
import { ProgramBasicInfo } from "../components/ProgramBasicInfo";
import dayjs from "dayjs";

export default function ProgramListPage() {
    // 버튼 이벤트
    const { mutate: searchPrograms, data:searchData } = useApiMutation<any[], any>("/api/bass20001");

    // 1. 컴포넌트 mount시 공통코드 조회
    const { data: lngTpData }     = useCommonCode("A002");  // 언어구분
    const { data: sysBizTpData }  = useCommonCode("Z102");  // 업무구분
    const { data: pgmFncTpData }  = useCommonCode("Z109");  // 프로그램기능구분
    const { data: pgmPrpsTpData } = useCommonCode("Z105");  // 프로그램용도구분
    const { data: pgmTpData }     = useCommonCode("Z104");  // 프로그램유형
    
    const lngTpOptions    = useMemo(() => makeSelectOptions(lngTpData   , "CODE", "LABEL")     , [lngTpData]);
    const sysBizTpOptions = useMemo(() => makeSelectOptions(sysBizTpData, "CODE", "LABEL", "Y"), [sysBizTpData]);
    const pgmFncTpOptions = useMemo(() => makeSelectOptions(pgmFncTpData, "CODE", "LABEL", "Y"), [pgmFncTpData]);
    
    // 2. Zustand에서 filter 상태와 setter 꺼내기
    const lng_tp     = useProgramFilter(state => state.lng_tp);
    const sys_biz_tp = useProgramFilter(state => state.sys_biz_tp);
    const pgm_fnc_tp = useProgramFilter(state => state.pgm_fnc_tp);
    const pgm_nm     = useProgramFilter(state => state.pgm_nm);
    const setFilter  = useProgramFilter(state => state.setFilter);

    const params = { lng_tp, sys_biz_tp, pgm_fnc_tp, pgm_nm };

    // 그리드 객체
	const myGrid = useRef<AUIGrid>(null);
    
    // 드랍다운리스트의 리스트
    const sysBizTpRef  = useRef<any>([]);
    const pgmTpRef     = useRef<any>([]);
    const pgmPrpsTpRef = useRef<any>([]);
    const pgmFncTpRef  = useRef<any>([]);

	// AUIGrid 칼럼 레이아웃
	const columnLayout: IGrid.Column[] = [
		{ dataField: 'PGM_ID'     , headerText: '프로그램ID'    , width: 100, style: 'aui-grid-text-align-left', editable: false},
		{ dataField: 'PGM_NM'     , headerText: '프로그램명'    , width: 150, style: 'aui-grid-text-align-left', editable: false},
        { dataField: 'SYS_BIZ_TP' , headerText: '업무구분'      , width: 100, style: 'aui-grid-text-align-left', editable: false
            , labelFunction: (rowIndex, columnIndex, value) => {
				let retStr = value;
				const sysBizTpDataList = sysBizTpRef.current;
				for (let i = 0, len = sysBizTpDataList.length; i < len; i++) {
					if (sysBizTpDataList[i]['value'] === value) {
						retStr = sysBizTpDataList[i]['label'];
						break;
					}
				}
				return retStr;
			}
            , editRenderer : { 
                type: IGrid.EditRendererKind.DropDownListRenderer,
                keyField: 'value', // key 에 해당되는 필드명
                valueField: 'label', // value 에 해당되는 필드명
                listFunction: () => {
                    return sysBizTpRef.current;
                },
                showEditorBtnOver : true
            }
        },
        { dataField: 'PGM_TP'     , headerText: '프로그램유형'  , width: 100, style: 'aui-grid-text-align-left'
            , labelFunction: (rowIndex, columnIndex, value) => {
				let retStr = value;
				const pgmTpDataList = pgmTpRef.current;
				for (let i = 0, len = pgmTpDataList.length; i < len; i++) {
					if (pgmTpDataList[i]['value'] === value) {
						retStr = pgmTpDataList[i]['label'];
						break;
					}
				}
				return retStr;
			}
            , editRenderer : { 
                type: IGrid.EditRendererKind.DropDownListRenderer,
                keyField: 'value', // key 에 해당되는 필드명
                valueField: 'label', // value 에 해당되는 필드명
                listFunction: () => {
                    return pgmTpRef.current;
                },
                showEditorBtnOver : true,
            } ,
        },
        { dataField: 'PGM_PRPS_TP', headerText: '용도구분'      , width: 100 
            , labelFunction: (rowIndex, columnIndex, value) => {
				let retStr = value;
				const pgmPrpsTpDataList = pgmPrpsTpRef.current;
				for (let i = 0, len = pgmPrpsTpDataList.length; i < len; i++) {
					if (pgmPrpsTpDataList[i]['value'] === value) {
						retStr = pgmPrpsTpDataList[i]['label'];
						break;
					}
				}
				return retStr;
			}
            , editRenderer : { 
                type : IGrid.EditRendererKind.DropDownListRenderer,
                keyField: 'value', // key 에 해당되는 필드명
                valueField: 'label', // value 에 해당되는 필드명
                listFunction: () => {
                    return pgmPrpsTpRef.current;
                } ,
                showEditorBtnOver : true,
            },
        },
        { dataField: 'PGM_FNC_TP' , headerText: '기능구분'      , width: 100 
            , labelFunction: (rowIndex, columnIndex, value) => {
				let retStr = value;
				const pgmFncTpDataList = pgmFncTpRef.current;
				for (let i = 0, len = pgmFncTpDataList.length; i < len; i++) {
					if (pgmFncTpDataList[i]['value'] === value) {
						retStr = pgmFncTpDataList[i]['label'];
						break;
					}
				}
				return retStr;
			}
            , editRenderer : { 
                type : IGrid.EditRendererKind.DropDownListRenderer,
                keyField: 'value', // key 에 해당되는 필드명
                valueField: 'label', // value 에 해당되는 필드명
                listFunction: () => {
                    return pgmFncTpRef.current;
                },
                showEditorBtnOver : true,
            } 
        },
        { dataField: 'USE_YN'     , headerText: '사용여부'      , width: 100, renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer } },
        { dataField: 'PGM_URL'    , headerText: 'URL' , style: 'aui-grid-text-align-left', editable: false },
	];

	// 그리드 속성 정의
	const gridProps: IGrid.Props = {
		editable: true,
		width: '100%',
		height: 475,
        // 셀 선택모드 'singleCell' | 'singleRow' | 'multipleCells' | 'multipleRows' | 'none';
		selectionMode: 'singleRow',
        // 행 체크박스
        showRowCheckColumn: true,
        // editable 을 true 로 설정한 경우 삭제, 수정, 추가 행에 대한 정보가 이 칼럼에 아이콘을 출력
        showStateColumn:true,
        // 페이징
        usePaging: true,
        // 페이징을 사용하는 경우 페이징의 방식을 지정합니다. 유효값은 "default", "simple", "button"
        pagingMode:'default', // 안써도됨
        // 한 페이지에 출력되는 행 수 지정(최대값 500)
        pageRowCount: 10,
        // 페이징을 사용할 때 1 페이지에 출력할 행의 개수를 변경할 수 있는 select UI 를 하단에 출력할지 여부를 지정합니다.
        showPageRowSelect: true,
        // 페이징의 행의 개수를 변경할 수 있는 select 의 option들을 지정합니다.
        pageRowSelectValues:[10, 50, 100, 150, 200, 250]
	};

    const grid = myGrid.current as AUIGrid;

    // 그리드 행 추가 및 행 삭제
    const handleAddRow = () => {
        const newRow = { 
            PGM_ID: "", 
            PGM_NM: "", 
            SYS_BIZ_TP: "", 
            PGM_TP: "", 
            PGM_PRPS_TP: "",  
            PGM_FNC_TP: "",
            USE_YN: 0,
            PGM_URL: ""
        };
        grid.addRow(newRow, "last");
    };

    const handleDeleteRow = () => {
        const selectedRows = grid.getSelectedRowIndexes();
        if (selectedRows.length > 0) {
            // 여러 개 삭제: reverse 정렬 후 삭제 권장
            selectedRows.sort((a, b) => b - a).forEach(idx => {
            grid.removeRow(idx);
            });
        } else {
            alert("삭제할 행을 선택하세요.");
        }
    };
    
    useEffect(() => {
        if (searchData) {
            grid.setGridData(searchData);
        }

        sysBizTpRef.current  = makeSelectOptions(sysBizTpData , "CODE", "LABEL");
        pgmTpRef.current     = makeSelectOptions(pgmTpData    , "CODE", "LABEL");
        pgmPrpsTpRef.current = makeSelectOptions(pgmPrpsTpData, "CODE", "LABEL");
        pgmFncTpRef.current  = makeSelectOptions(pgmFncTpData , "CODE", "LABEL");
    }, [searchData, grid]);

  return (
    <div className="flex flex-col w-full h-full">
        <PageToolbar
            onSearch={() => searchPrograms(params)} 
            onSave={() => {
                // console.log(myGrid.current?.getGridData())
                console.log(myGrid.current?.getEditedRowItems())
                console.log(myGrid.current?.getCheckedRowItemsAll())
                console.log(myGrid.current?.getAddedRowItems());
                console.log(myGrid.current?.getRemovedItems());
            }}
            onExcel={() => grid.exportToXlsx({  fileName: '프로그램 목록_' + dayjs().format('YYYYMMDDHHmmss'), isRowStyleFront: false, progressBar: true }) }
        />
        <section className="mb-2 rounded border border-gray-200 bg-white">
            <form className="w-full">
                <div className="flex gap-2">
                    <Field label="언어">
                        <SelectBox
                            value={lng_tp}
                            onChange={e => setFilter({ lng_tp: e })}
                            options={lngTpOptions}
                            >
                        </SelectBox>
                    </Field>
                    <Field label="업무구분">
                        <SelectBox
                            // isMulti
                            value={sys_biz_tp}
                            onChange={e => setFilter({ sys_biz_tp: e })}
                            options={sysBizTpOptions}
                            >
                        </SelectBox>
                    </Field>
                    <Field label="기능구분">
                        <SelectBox
                            value={pgm_fnc_tp}
                            onChange={e => setFilter({ pgm_fnc_tp: e })}
                            options={pgmFncTpOptions}
                            >
                        </SelectBox>
                    </Field>
                    <Field label="프로그램명">
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
                            value={pgm_nm}
                            onChange={e => setFilter({ pgm_nm: e.target.value })}
                        />
                    </Field>
                </div>
            </form>
        </section>
        <ProgramBasicInfo />
        <section className="w-full h-full flex flex-col rounded border border-gray-200 bg-white mb-2 shadow-sm overflow-hidden flex-1 min-h-0">
            <div className="flex items-center px-3 py-1 border-b bg-gray-50 flex-shrink-0">
                <span className="font-semibold text-sm text-gray-700">프로그램 목록</span>
                <div className="ml-auto flex gap-1">
                    <button
                    className="px-3 py-1 text-sm rounded-lg bg-white border border-black text-black font-medium hover:bg-gray-200 transition"
                    onClick={handleAddRow}
                    >
                    행추가
                    </button>
                    <button
                    className="px-3 py-1 text-sm rounded-lg bg-white border border-black text-black font-medium hover:bg-gray-200 transition"
                    onClick={handleDeleteRow}
                    >
                    행삭제
                    </button>
                </div>
            </div>
            <div className="flex-1 min-h-0">
                <div className="ag-theme-alpine h-full w-full">
                    <AUIGrid ref={myGrid} columnLayout={columnLayout} gridProps={gridProps}/>
                </div>
            </div>
        </section>
    </div>
  );
}
