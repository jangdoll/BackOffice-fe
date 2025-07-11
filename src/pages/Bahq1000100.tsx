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
    const { mutate: saveComList  , data:saveData }         = useApiMutation<any[], any>("/api/bahq10001/saveComList");
    
    const saveConfirm = async () => {
        const result = await customConfirm("저장 하시겠습니까?", "확인", "취소");
        if (result) {
            const params02 = { co_cd: '1400'
                , comGrpListToSave: getChangedRows(myGrid01.current)
                , comCdLsitToSave : getChangedRows(myGrid02.current)};
            saveComList(params02);
            console.log(params02);
        }
    }

    const saveHandler = () => {
        if ( getChangedRows(myGrid01.current).length < 1 &&
             getChangedRows(myGrid02.current).length < 1 ){
            customAlert("저장할 항목이 없습니다.");
            return false;
        }
        // const isValid01 = myGrid01.current?.validateGridData(["com_cd_tp", "com_grp_cd", "grp_nm"], "필수 필드는 반드시 값을 직접 입력해야 합니다.");
        const isValid01 = myGrid01.current?.validateGridData(["com_cd_tp", "com_grp_cd"], "필수 필드는 반드시 값을 직접 입력해야 합니다.");
        const isValid02 = myGrid02.current?.validateGridData(["com_cd", "itm_nm"], "필수 필드는 반드시 값을 직접 입력해야 합니다.");
        if (!isValid01 || !isValid02) {
            return false;
        }
        saveConfirm();
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

    // 드랍다운리스트의 리스트
    const CombinationGroupTpRef  = useRef<any>([]);
    
    const params01 = { cbLangTp, cbCdGbTp, stGrpNm, stCdNm, co_cd };

    // AUIGrid 칼럼 레이아웃
    const columnLayout01: IGrid.Column[] = [
        { dataField: 'com_cd_tp'     , headerText: '통합그룹구분', width: 140
            , editRenderer : { 
                type : IGrid.EditRendererKind.DropDownListRenderer,
                keyField: 'value', // key 에 해당되는 필드명
                valueField: 'label', // value 에 해당되는 필드명
                showEditorBtnOver : false,
                listFunction: () => {
                    return CombinationGroupTpRef.current;
                } ,
            },
        },
        { dataField: 'com_grp_cd'    , headerText: '그룹코드'    , width: 100, editRenderer: { type: IGrid.EditRendererKind.InputEditRenderer, maxlength:4 } },
        { dataField: 'grp_nm'        , headerText: '그룹명'      , width: 200, style: 'aui-grid-text-align-left', editRenderer: { type: IGrid.EditRendererKind.InputEditRenderer, maxlength:50 } },
        { dataField: 'itm_len'       , headerText: '코드길이'    , width: 100, dataType: 'numeric', formatString: '#,##0', editRenderer: { type: IGrid.EditRendererKind.InputEditRenderer, maxlength:2 } },
        { dataField: 'dsp_seq'       , headerText: '표시순번'    , width: 120, dataType: 'numeric', formatString: '#,##0',},
        { dataField: 'up_com_grp_cd' , headerText: '상위그룹코드', width: 140, editRenderer: { type: IGrid.EditRendererKind.InputEditRenderer, maxlength:4 } },
        { dataField: 'use_yn'        , headerText: '사용여부'    , width: 90 , renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer, editable: true, checkValue: "1" ,unCheckValue: "0" } },
        { dataField: 'pos_use_yn'    , headerText: 'POS사용여부' , width: 100, renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer, editable: true, checkValue: "1" ,unCheckValue: "0" } },
        { dataField: 'dscrt'         , headerText: '설명'        , width: 200, style: 'aui-grid-text-align-left', editRenderer: { type: IGrid.EditRendererKind.InputEditRenderer, maxlength:10}},
        { dataField: 'wrd_val_ttl_01', headerText: '문자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_02', headerText: '문자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_03', headerText: '문자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_04', headerText: '문자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_05', headerText: '문자값05'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_06', headerText: '문자값06'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_07', headerText: '문자값07'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_08', headerText: '문자값08'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_09', headerText: '문자값09'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_10', headerText: '문자값10'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_11', headerText: '문자값11'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_12', headerText: '문자값12'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_13', headerText: '문자값13'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_14', headerText: '문자값14'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_ttl_15', headerText: '문자값15'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_ttl_01', headerText: '숫자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_ttl_02', headerText: '숫자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_ttl_03', headerText: '숫자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_ttl_04', headerText: '숫자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_ttl_05', headerText: '숫자값05'    , width: 100, style: 'aui-grid-text-align-left'},
    ]

    const columnLayout02: IGrid.Column[] = [
        { dataField: 'com_cd'       , headerText: '통합코드'    , width: 80 },
        { dataField: 'itm_nm'       , headerText: '통합코드명'  , width: 300, style: 'aui-grid-text-align-left'},
        { dataField: 'dsp_seq'      , headerText: '표시순번'    , width: 70 , dataType: 'numeric', formatString: '#,##0'},
        { dataField: 'up_com_grp_cd', headerText: '상위그룹코드', width: 110, editRenderer: { type: IGrid.EditRendererKind.InputEditRenderer, maxlength:4 } },
        { dataField: 'up_com_cd'    , headerText: '상위통합코드', width: 110},
        { dataField: 'use_yn'       , headerText: '사용여부'    , width: 80 , renderer : { type : IGrid.RendererKind.CheckBoxEditRenderer, editable: true, checkValue: "1" ,unCheckValue: "0" } },
        { dataField: 'dscrt'        , headerText: '설명'        , width: 200, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_01'   , headerText: '문자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_02'   , headerText: '문자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_03'   , headerText: '문자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_04'   , headerText: '문자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_05'   , headerText: '문자값05'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_06'   , headerText: '문자값06'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_07'   , headerText: '문자값07'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_08'   , headerText: '문자값08'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_09'   , headerText: '문자값09'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_10'   , headerText: '문자값10'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_11'   , headerText: '문자값11'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_12'   , headerText: '문자값12'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_13'   , headerText: '문자값13'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_14'   , headerText: '문자값14'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'wrd_val_15'   , headerText: '문자값15'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_01'   , headerText: '숫자값01'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_02'   , headerText: '숫자값02'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_03'   , headerText: '숫자값03'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_04'   , headerText: '숫자값04'    , width: 100, style: 'aui-grid-text-align-left'},
        { dataField: 'num_val_05'   , headerText: '숫자값05'    , width: 100, style: 'aui-grid-text-align-left'},
    ]

    // 그리드 속성 정의
	const gridProps01: IGrid.Props = {
		editable: true,
		width: '100%',
		height: '100%',
		selectionMode: 'singleRow',
        showStateColumn:true,
        // 컬럼 고정
        fixedColumnCount: 4,
        // 고정 칼럼, 행에 있는 셀도 수정 가능 여부(기본값:false)
        editableOnFixedCell: true
	};

    const gridProps02: IGrid.Props = {
		editable: true,
		width: '100%',
		height: '100%',
		selectionMode: 'singleRow',
        showStateColumn:true,
        // 컬럼 고정
        fixedColumnCount: 2,
        // 고정 칼럼, 행에 있는 셀도 수정 가능 여부(기본값:false)
        editableOnFixedCell: true
	};

    const newRow01 = { 
        co_cd : "1400",
        lng_tp : cbLangTp,
        com_cd_tp : "",
        com_grp_cd: "",    
        grp_nm: "",        
        itm_len: "1",       
        dsp_seq: "0",       
        up_com_grp_cd: "",
        use_yn: "1",
        pos_use_yn: "0",    
        dscrt: "",
        wrd_val_ttl_01: "",
        wrd_val_ttl_02: "",
        wrd_val_ttl_03: "",
        wrd_val_ttl_04: "",
        wrd_val_ttl_05: "",
        wrd_val_ttl_06: "",
        wrd_val_ttl_07: "",
        wrd_val_ttl_08: "",
        wrd_val_ttl_09: "",
        wrd_val_ttl_10: "",
        wrd_val_ttl_11: "",
        wrd_val_ttl_12: "",
        wrd_val_ttl_13: "",
        wrd_val_ttl_14: "",
        wrd_val_ttl_15: "",
        num_val_ttl_01: "",
        num_val_ttl_02: "",
        num_val_ttl_03: "",
        num_val_ttl_04: "",
        num_val_ttl_05: ""
    };

    const newRow02 = { 
        co_cd: '1400',
        com_grp_cd: "",
        lng_tp: "ko-KR",
        com_cd: "",
        itm_nm: "",
        dsp_seq: "",
        up_com_grp_cd: "",
        up_com_cd: "",
        use_yn: "1",
        dscrt: "",
        wrd_val_01: "",
        wrd_val_02: "",
        wrd_val_03: "",
        wrd_val_04: "",
        wrd_val_05: "",
        wrd_val_06: "",
        wrd_val_07: "",
        wrd_val_08: "",
        wrd_val_09: "",
        wrd_val_10: "",
        wrd_val_11: "",
        wrd_val_12: "",
        wrd_val_13: "",
        wrd_val_14: "",
        wrd_val_15: "",
        num_val_01: "",
        num_val_02: "",
        num_val_03: "",
        num_val_04: "",
        num_val_05: ""
    };

    // 그리드 행 추가
    const handleAddRow = (grid: AUIGrid | null, rowData: any) => {
        if (grid === myGrid02.current){
            if (myGrid01.current?.isAddedByRowIndex(myGrid01.current?.getSelectedIndex()[0])) {
                customAlert("추가는 조회 후 가능합니다.");
            } else {
                const comGrpCd = myGrid01.current?.getSelectedRows()[0]?.com_grp_cd ?? "";
                const dspSeq = myGrid02.current?.getRowCount() ?? 0;
    
                rowData.com_grp_cd = comGrpCd;
                rowData.dsp_seq = dspSeq + 1;
                grid?.addRow(rowData, "last");
                grid?.openInputer();
            }
        } else {
            grid?.addRow(rowData, "last");
            grid?.openInputer();
        }
    };

    // 그리드 행 삭제
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
        if (saveData) {
            getComGrpList(params01);
            customAlert("저장 되었습니다.");
        }
    }, [saveData]);

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
        if (CombinationGroupTpData) {
            CombinationGroupTpRef.current  = makeSelectOptions(CombinationGroupTpData , "CODE", "LABEL");
        }
    }, [CombinationGroupTpData]);

    useEffect(() => {
        myGrid01.current?.bind(IGrid.EventKind.SelectionChange, async (event) => {
            if ( getChangedRows(myGrid02.current).length > 0 ){
                const result = await customConfirm("변경된 데이터가 존재합니다. 계속 진행하시겠습니까?", "확인", "취소");
                if (result) {
                    const selectedItem = event.primeCell.item;
                    const params02 = { co_cd: '1400', cbLangTp: selectedItem.lng_tp, grpCd: selectedItem.com_grp_cd };
                    getComCdList(params02);
                }
            } else {
                const selectedItem = event.primeCell.item;
                const params02 = { co_cd: '1400', cbLangTp: selectedItem.lng_tp, grpCd: selectedItem.com_grp_cd };
                getComCdList(params02);
            }
        });

        myGrid01.current?.bind(IGrid.EventKind.CellEditBegin, (event: any) => {
            if (event.dataField === "com_cd_tp" || event.dataField === "com_grp_cd") {
                if(myGrid01.current?.isAddedByRowIndex(event.rowIndex)){
                    return true;
                } else {
                    return false;
                }
            } 
        });

        myGrid02.current?.bind(IGrid.EventKind.CellEditBegin, (event: any) => {
            if (event.dataField === "com_cd") {
                if(myGrid02.current?.isAddedByRowIndex(event.rowIndex)){
                    return true;
                } else {
                    return false;
                }
            } 
        });

        myGrid01.current?.bind(IGrid.EventKind.AddRowFinish, (event: any) => {
            myGrid01.current?.setSelectionByIndex(event.rowIndex, 0);
        });

        myGrid02.current?.bind(IGrid.EventKind.AddRowFinish, (event: any) => {
            myGrid02.current?.setSelectionByIndex(event.rowIndex, 0);
        });

    }, []);

    return (
        <div className="flex flex-col w-full h-full">
            <PageToolbar
                onSearch={() => getComGrpList(params01)} 
                onSave={() => {saveHandler()}
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