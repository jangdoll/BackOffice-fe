import React, { useEffect, useRef } from "react";
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

export default function ProgramListPage() {
    // 버튼 이벤트
    const { mutate: searchPrograms, data:searchData } = useApiMutation<any[], any>("/api/bass20001");

    // 1. 컴포넌트 mount시 공통코드 조회
    const { data: lngTpData }    = useCommonCode("A002");
    const { data: sysBizTpData } = useCommonCode("Z102");
    const { data: pgmFncTpData } = useCommonCode("Z109");
    
    const lngTpOptions    = React.useMemo(() => makeSelectOptions(lngTpData   , "CODE", "LABEL")     , [lngTpData]);
    const sysBizTpOptions = React.useMemo(() => makeSelectOptions(sysBizTpData, "CODE", "LABEL", "Y"), [sysBizTpData]);
    const pgmFncTpOptions = React.useMemo(() => makeSelectOptions(pgmFncTpData, "CODE", "LABEL", "Y"), [pgmFncTpData]);

    
    // 2. Zustand에서 filter 상태와 setter 꺼내기
    const lng_tp     = useProgramFilter(state => state.lng_tp);
    const sys_biz_tp = useProgramFilter(state => state.sys_biz_tp);
    const pgm_fnc_tp = useProgramFilter(state => state.pgm_fnc_tp);
    const pgm_nm     = useProgramFilter(state => state.pgm_nm);
    const setFilter  = useProgramFilter(state => state.setFilter);

    const params = { lng_tp, sys_biz_tp, pgm_fnc_tp, pgm_nm };

    // 그리드 객체
	const myGrid = useRef<AUIGrid>(null);

	// AUIGrid 칼럼 레이아웃
	const columnLayout: IGrid.Column[] = [
		{ dataField: 'PGM_ID'     , headerText: '프로그램ID'    , width: 100 },
		{ dataField: 'PMG_NM'     , headerText: '프로그램명'    , width: 150 },
        { dataField: 'SYS_BIZ_TP' , headerText: '업무구분'      , width: 100 },
        { dataField: 'PMG_TP'     , headerText: '프로그램유형'  , width: 100 },
        { dataField: 'PGM_PRPS_TP', headerText: '용도구분'      , width: 100 },
        { dataField: 'PGM_FNC_TP' , headerText: '기능구분'      , width: 100 },
        { dataField: 'use_yn'     , headerText: '사용여부'      , width: 100 },
        { dataField: 'PGM_URL'    , headerText: 'URL' },
	];

	// 그리드 속성 정의
	const gridProps: IGrid.Props = {
		editable: false,
		width: '100%',
		height: 475,
		selectionMode: 'multipleCells'
	};

    const grid = myGrid.current as AUIGrid;

    React.useEffect(() => {
        if (searchData) {
            grid.setGridData(searchData);
        }
    }, [searchData, grid]);

  return (
    <div className="flex flex-col w-full h-full">
        <PageToolbar
            onSearch={() => searchPrograms(params)} 
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
            <div className="flex items-center px-3 py-2 border-b bg-gray-50 flex-shrink-0">
                <span className="font-semibold text-sm text-gray-700">프로그램 목록</span>
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
