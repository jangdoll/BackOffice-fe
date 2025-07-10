import React, { useEffect, useMemo, useRef } from "react";
import { PageToolbar } from "../components/PageToolbar";
import AUIGrid from "../components/AUIGridReact";
import { Field } from "../components/Field";
import SelectBox from "../components/SelectBox";
import { useCommonCode } from "../hooks/useCommonCode";
import { makeSelectOptions } from "../utils/makeSelectOptions";
import { searchViewFilter } from "../store/Bahq1000100Filter";
import { useApiMutation } from "../hooks/useApiMutation";
import * as IGrid from 'aui-grid';
import { customAlert, customConfirm } from "../components/CustomDialog";
import { getChangedRows } from "../utils/auigrid-utils";

export default function Bahq1000100() {
    // 버튼 이벤트
    const { mutate: getComGrpList, data:searchData }       = useApiMutation<any[], any>("/api/bahq10001/getComGrpList");
    const { mutate: getComCdList , data:searchDetailData } = useApiMutation<any[], any>("/api/bahq10001/getComCdList");
    // const { mutate: saveComList  , data:saveData }         = useApiMutation<any[], any>("/api/bahq10001/saveComList");

    const saveconfirm = async () => {
        const result = await customConfirm("저장 하시겠습니까?", "확인", "취소");
        if (result) {
            const params02 = { co_cd: '1400'
                , comGrpListToSave: getChangedRows(myGrid01.current)
                , comCdLsitToSave : getChangedRows(myGrid02.current)};
            // saveComList(params02);
            console.log(params02);
        }
    }

    // 1. 컴포넌트 mount시 공통코드 조회
    const { data: CombinationGroupTpData } = useCommonCode("A001");  // 통합그룹구분
    const { data: lngTpData }              = useCommonCode("A002");  // 언어구분
    
    const lngTpOptions              = useMemo(() => makeSelectOptions(lngTpData             , "CODE", "LABEL")     , [lngTpData]);
    const CombinationGroupTpOptions = useMemo(() => makeSelectOptions(CombinationGroupTpData, "CODE", "LABEL", "Y"), [CombinationGroupTpData]);

    // 2. Zustand에서 filter 상태와 setter 꺼내기
    const cbLangTp = searchViewFilter(state => state.cbLangTp);
    const cbCdGbTp = searchViewFilter(state => state.cbCdGbTp);
    const stGrpNm  = searchViewFilter(state => state.stGrpNm);
    const stCdNm   = searchViewFilter(state => state.stCdNm);
    const co_cd    = "1400";
    const setFilter  = searchViewFilter(state => state.setFilter);

    
    // 그리드 객체
	const myGrid01 = useRef<AUIGrid>(null);
    const myGrid02 = useRef<AUIGrid>(null);
    
    const grid01 = myGrid01.current as AUIGrid;
    const grid02 = myGrid02.current as AUIGrid;
    
    const params01 = { cbLangTp, cbCdGbTp, stGrpNm, stCdNm, co_cd };

    // AUIGrid 칼럼 레이아웃
    const columnLayout01: IGrid.Column[] = [
        { dataField: 'COM_CD_TP'     , headerText: '통합그룹구분', width: 140, editable: true},
        { dataField: 'COM_GRP_CD'    , headerText: '그룹코드'    , width: 100, editable: true},
        { dataField: 'GRP_NM'        , headerText: '그룹명'      , width: 200, editable: true, style: 'aui-grid-text-align-left'},
        { dataField: 'ITM_LEN'       , headerText: '코드길이'    , width: 100, editable: true},
        { dataField: 'DSP_SEQ'       , headerText: '표시순번'    , width: 120},
        { dataField: 'UP_COM_GRP_CD' , headerText: '상위그룹코드', width: 140},
        { dataField: 'USE_YN'        , headerText: '사용여부'    , width: 90 , renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer, editable: true } },
        { dataField: 'POS_USE_YN'    , headerText: 'POS사용여부' , width: 100, renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer, editable: true } },
        { dataField: 'DSCRT'         , headerText: '설명'        , width: 200, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_01', headerText: '문자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_02', headerText: '문자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_03', headerText: '문자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_04', headerText: '문자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_05', headerText: '문자값05'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_06', headerText: '문자값06'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_07', headerText: '문자값07'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_08', headerText: '문자값08'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_09', headerText: '문자값09'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_10', headerText: '문자값10'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_11', headerText: '문자값11'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_12', headerText: '문자값12'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_13', headerText: '문자값13'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_14', headerText: '문자값14'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_TTL_15', headerText: '문자값15'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_TTL_01', headerText: '숫자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_TTL_02', headerText: '숫자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_TTL_03', headerText: '숫자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_TTL_04', headerText: '숫자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_TTL_05', headerText: '숫자값05'    , width: 100, style: 'aui-grid-text-align-left'},
    ]

    const columnLayout02: IGrid.Column[] = [
        { dataField: 'COM_CD'       , headerText: '통합코드'    , width: 80, editable: true },
        { dataField: 'ITM_NM'       , headerText: '통합코드명'  , width: 300, editable: true, style: 'aui-grid-text-align-left'},
        { dataField: 'DSP_SEQ'      , headerText: '표시순번'    , width: 70 },
        { dataField: 'UP_COM_GRP_CD', headerText: '상위그룹코드', width: 110},
        { dataField: 'UP_COM_CD'    , headerText: '상위통합코드', width: 110},
        { dataField: 'USE_YN'       , headerText: '사용여부'    , width: 80 , renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer, editable: true } },
        { dataField: 'DSCRT'        , headerText: '설명'        , width: 200, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_01'   , headerText: '문자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_02'   , headerText: '문자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_03'   , headerText: '문자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_04'   , headerText: '문자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_05'   , headerText: '문자값05'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_06'   , headerText: '문자값06'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_07'   , headerText: '문자값07'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_08'   , headerText: '문자값08'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_09'   , headerText: '문자값09'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_10'   , headerText: '문자값10'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_11'   , headerText: '문자값11'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_12'   , headerText: '문자값12'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_13'   , headerText: '문자값13'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_14'   , headerText: '문자값14'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'WRD_VAL_15'   , headerText: '문자값15'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_01'   , headerText: '숫자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_02'   , headerText: '숫자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_03'   , headerText: '숫자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_04'   , headerText: '숫자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'NUM_VAL_05'   , headerText: '숫자값05'    , width: 100, style: 'aui-grid-text-align-left'},
    ]

    // 그리드 속성 정의
	const gridProps01: IGrid.Props = {
		editable: true,
		width: '100%',
		height: '100%',
		selectionMode: 'singleRow',
        showStateColumn:true,
        fixedColumnCount: 4
	};

    const gridProps02: IGrid.Props = {
		editable: true,
		width: '100%',
		height: '100%',
		selectionMode: 'singleRow',
        showStateColumn:true,
        fixedColumnCount: 2
	};

    const newRow01 = { 
        CO_CD : "1400",
        LNG_TP : cbLangTp,
        COM_CD_TP : "",
        COM_GRP_CD: "",    
        GRP_NM: "",        
        ITM_LEN: "1",       
        DSP_SEQ: "0",       
        UP_COM_GRP_CD: "",
        USE_YN: "1",
        POS_USE_YN: "",    
        DSCRT: "",
        WRD_VAL_TTL_01: "",
        WRD_VAL_TTL_02: "",
        WRD_VAL_TTL_03: "",
        WRD_VAL_TTL_04: "",
        WRD_VAL_TTL_05: "",
        WRD_VAL_TTL_06: "",
        WRD_VAL_TTL_07: "",
        WRD_VAL_TTL_08: "",
        WRD_VAL_TTL_09: "",
        WRD_VAL_TTL_10: "",
        WRD_VAL_TTL_11: "",
        WRD_VAL_TTL_12: "",
        WRD_VAL_TTL_13: "",
        WRD_VAL_TTL_14: "",
        WRD_VAL_TTL_15: "",
        NUM_VAL_TTL_01: "",
        NUM_VAL_TTL_02: "",
        NUM_VAL_TTL_03: "",
        NUM_VAL_TTL_04: "",
        NUM_VAL_TTL_05: "",
        isNew: true
    };

    const newRow02 = { 
        CO_CD: '1400',
        COM_GRP_CD: "",
        LNG_TP: "ko-KR",
        COM_CD: "",
        ITM_NM: "",
        DSP_SEQ: "",
        UP_COM_GRP_CD: "",
        UP_COM_CD: "",
        USE_YN: "1",
        DSCRT: "",
        WRD_VAL_01: "",
        WRD_VAL_02: "",
        WRD_VAL_03: "",
        WRD_VAL_04: "",
        WRD_VAL_05: "",
        WRD_VAL_06: "",
        WRD_VAL_07: "",
        WRD_VAL_08: "",
        WRD_VAL_09: "",
        WRD_VAL_10: "",
        WRD_VAL_11: "",
        WRD_VAL_12: "",
        WRD_VAL_13: "",
        WRD_VAL_14: "",
        WRD_VAL_15: "",
        NUM_VAL_01: "",
        NUM_VAL_02: "",
        NUM_VAL_03: "",
        NUM_VAL_04: "",
        NUM_VAL_05: ""
    };

    // 그리드 행 추가 및 행 삭제
    const handleAddRow = (grid: AUIGrid | null, rowData: any) => {
        if (grid === myGrid02.current){
            if (myGrid01.current?.getSelectedRows()[0]?.isNew) {
                customAlert("추가는 조회 후 가능합니다.");
            } else {
                const comGrpCd = myGrid01.current?.getSelectedRows()[0]?.COM_GRP_CD ?? "";
                const dspSeq = myGrid02.current?.getRowCount() ?? 0;
    
                rowData.COM_GRP_CD = comGrpCd;
                rowData.DSP_SEQ = dspSeq + 1;
                grid?.addRow(rowData, "last");
                grid?.openInputer();
            }
        } else {
            grid?.addRow(rowData, "last");
            grid?.openInputer();
        }
    };

    const handleDeleteRow = (grid: AUIGrid|null) => {
        if (grid) {
            const selectedRows = grid.getSelectedRowIndexes();
            if (selectedRows.length > 0) {
                selectedRows.sort((a, b) => b - a).forEach(idx => {grid.removeRow(idx);});
            } else {
                alert("삭제할 행을 선택하세요.");
            }
        }
    };

    useEffect(() => {
        if (searchData) {
            grid01.setGridData(searchData);
            grid01.setSelectionByIndex(0, 0);
        }
    }, [searchData]);

    useEffect(() => {
        if (searchDetailData) {
            grid02.setGridData(searchDetailData);
            // grid02.setSelectionByIndex(0, 0);
        }
    }, [searchDetailData]);

    useEffect(() => {
        myGrid01.current?.bind("selectionChange", async (event) => {
            const addItems = myGrid02.current?.getAddedRowItems().length || 0;
            const editItems = myGrid02.current?.getEditedRowItems().length || 0;
            const removeItems = myGrid02.current?.getRemovedItems().length || 0;
            if ( addItems + editItems + removeItems > 0 ){
                const result = await customConfirm("변경된 데이터가 존재합니다. 계속 진행하시겠습니까?", "확인", "취소");
                if (result) {
                    const selectedItem = event.primeCell.item;
                    const params02 = { co_cd: '1400', cbLangTp: selectedItem.LNG_TP, grpCd: selectedItem.COM_GRP_CD };
                    getComCdList(params02);
                }
            } else {
                const selectedItem = event.primeCell.item;
                const params02 = { co_cd: '1400', cbLangTp: selectedItem.LNG_TP, grpCd: selectedItem.COM_GRP_CD };
                getComCdList(params02);
            }
        });

        myGrid01.current?.bind("addRow", (event: any) => {
            console.log(event);
            if (event.type === "addRow") {
                myGrid01.current?.isEditedByRowIndex(event.rowIndex);
                event.returnValue = true;
                console.log(event.returnValue);
            } else {
                event.returnValue = false;
            }
        });

        myGrid02.current?.bind("addRow", (event: any) => {
            if (event.item?.isNew) {
                event.returnValue = true;
            } else {
                event.returnValue = false;
            }
        });
    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            <PageToolbar
                onSearch={() => getComGrpList(params01)} 
                onSave={() => {
                    saveconfirm()
                    // console.log(myGrid01.current?.getAddedRowItems())
                    // console.log(myGrid01.current?.getRemovedItems())
                    // console.log(myGrid02.current?.getAddedRowItems())
                    // console.log(myGrid02.current?.getRemovedItems())
                    }
                }
            />
            <section className="mb-2 rounded border border-gray-200 bg-white">
                <form className="w-full">
                    <div className="flex gap-2">
                        <Field label="언어" required>
                            <SelectBox
                                value={cbLangTp}
                                onChange={e => setFilter({ cbLangTp: e })}
                                options={lngTpOptions}
                                >
                            </SelectBox>
                        </Field>
                        <Field label="통합그룹구분">
                            <SelectBox
                                value={cbCdGbTp}
                                onChange={e => setFilter({ cbCdGbTp: e })}
                                options={CombinationGroupTpOptions}
                                >
                            </SelectBox>
                        </Field>
                        <Field label="통합그룹명">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
                                value={stGrpNm}
                                onChange={e => setFilter({ stGrpNm: e.target.value })}
                            />
                        </Field>
                        <Field label="통합코드명">
                            <input
                                type="text"
                                className="w-full border border-gray-300 rounded-none px-2 py-0.5 text-xs h-[30px] focus:outline-[#2563eb]"
                                value={stCdNm}
                                onChange={e => setFilter({ stCdNm: e.target.value })}
                            />
                        </Field>
                    </div>
                </form>
            </section>
            <section className="w-full h-full flex flex-col rounded border border-gray-200 bg-white mb-2 shadow-sm overflow-hidden flex-1 min-h-0">
                <div className="flex items-center px-3 py-1 border-b bg-gray-50 flex-shrink-0">
                    <span className="font-semibold text-sm text-gray-700">통합그룹코드</span>
                    <div className="ml-auto flex gap-1">
                        <button
                        className="px-3 py-1 text-sm rounded-lg bg-white border border-black text-black font-medium hover:bg-gray-200 transition"
                        onClick={() => handleAddRow(myGrid01.current, newRow01)}
                        >
                        행추가
                        </button>
                        <button
                        className="px-3 py-1 text-sm rounded-lg bg-white border border-black text-black font-medium hover:bg-gray-200 transition"
                        onClick={() => handleDeleteRow(myGrid01.current)}
                        >
                        행삭제
                        </button>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <div className="ag-theme-alpine h-full w-full">
                        <AUIGrid ref={myGrid01} columnLayout={columnLayout01} gridProps={gridProps01}/>
                    </div>
                </div>
            </section>
            <section className="w-full h-full flex flex-col rounded border border-gray-200 bg-white mb-2 shadow-sm overflow-hidden flex-1 min-h-0">
                <div className="flex items-center px-3 py-1 border-b bg-gray-50 flex-shrink-0">
                    <span className="font-semibold text-sm text-gray-700">통합코드</span>
                    <div className="ml-auto flex gap-1">
                        <button
                        className="px-3 py-1 text-sm rounded-lg bg-white border border-black text-black font-medium hover:bg-gray-200 transition"
                        onClick={() => handleAddRow(myGrid02.current, newRow02)}
                        >
                        행추가
                        </button>
                        <button
                        className="px-3 py-1 text-sm rounded-lg bg-white border border-black text-black font-medium hover:bg-gray-200 transition"
                        onClick={() => handleDeleteRow(myGrid02.current)}
                        >
                        행삭제
                        </button>
                    </div>
                </div>
                <div className="flex-1 min-h-0">
                    <div className="ag-theme-alpine h-full w-full">
                        <AUIGrid ref={myGrid02} columnLayout={columnLayout02} gridProps={gridProps02}/>
                    </div>
                </div>
            </section>
        </div>
    );
}