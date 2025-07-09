import React, { useEffect, useMemo, useRef } from "react";
import { PageToolbar } from "../components/PageToolbar";
import { useApiMutation } from "../hooks/useApiMutation";
import AUIGrid from "../components/AUIGridReact";
import * as IGrid from 'aui-grid';
import dayjs from "dayjs";

export default function Baos13009() {
    // 버튼 이벤트
    const { mutate: searchPrograms, data:searchData } = useApiMutation<any[], any>("/api/baos13009/getMshpSaleCate");

    const params = { lng_tp : "1400" };

    // 그리드 객체
	const myGrid = useRef<AUIGrid>(null);

    const grid = myGrid.current as AUIGrid;

    // AUIGrid 칼럼 레이아웃
        const columnLayout: IGrid.Column[] = [
            { dataField: 'BUSI_AREA_CD'      , headerText: '상권'     , width: 50,
                labelFunction: (rowIndex, columnIndex, value) => value == 'undefined' ? "" : value
              },
            { dataField: 'REGN_NM'           , headerText: '지역'     , width: 170,
                labelFunction: (rowIndex, columnIndex, value) => value == 'undefined' ? "" : value
             },
            { dataField: 'GEND_NM'           , headerText: '성별'     , width: 50  },
            { dataField: 'AREA_VNOR_SALE_AMT', headerText: '매출금액' , width: 110, dataType: 'numeric', formatString: '#,##0'   , style: 'aui-grid-text-align-right' },
            { dataField: 'COMPONENT_RATE'    , headerText: '구성비(%)', width: 80 , dataType: 'numeric', formatString: '#,##0.00', style: 'aui-grid-text-align-right' },
            {
                headerText: '연령대',
                children: [
                    { dataField: 'S0', headerText: '0대'  , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S1', headerText: '10대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S2', headerText: '20대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S3', headerText: '30대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S4', headerText: '40대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S5', headerText: '50대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S6', headerText: '60대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S7', headerText: '70대' , dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'S8', headerText: '80대~', dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                ]
            },
            {
                headerText: '내/외국인구분',
                children: [
                    { dataField: 'NATIVE_AMT'   , headerText: '내국인', dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                    { dataField: 'FOREIGNER_AMT', headerText: '외국인', dataType: 'numeric', formatString: '#,##0', style: 'aui-grid-text-align-right' },
                ]
            },
        ];

        // 푸터 레이아웃 작성하여 반환.
        const getFooterLayout = () => {
            // 푸터 레이아웃 설정
            const footerLayout: IGrid.Footer[] = [
                { colSpan: 3, labelText: '합계' , positionField: 'BUSI_AREA_CD' },
                {dataField: 'AREA_VNOR_SALE_AMT', positionField: 'AREA_VNOR_SALE_AMT', operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'COMPONENT_RATE'    , positionField: 'COMPONENT_RATE'    , operation: 'SUM', formatString: '#,##0.00', style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S0'                , positionField: 'S0'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S1'                , positionField: 'S1'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S2'                , positionField: 'S2'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S3'                , positionField: 'S3'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S4'                , positionField: 'S4'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S5'                , positionField: 'S5'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S6'                , positionField: 'S6'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S7'                , positionField: 'S7'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'S8'                , positionField: 'S9'                , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'NATIVE_AMT'        , positionField: 'NATIVE_AMT'        , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'},
                {dataField: 'FOREIGNER_AMT'     , positionField: 'FOREIGNER_AMT'     , operation: 'SUM', formatString: '#,##0'   , style: 'aui-grid-custom-sum-total-right'}
            ];
            return footerLayout;
        };

        // 그리드 속성 정의
        const gridProps: IGrid.Props = {
            editable: false,
            width: '100%',
            height: 735,
            selectionMode: 'singleRow',
            showBranchOnGrouping: false,
            // 그룹핑 
            groupingFields: ['BUSI_AREA_CD', 'REGN_NM'],
            // 그룹핑 후 합계필드를 출력하도록 설정합니다.
            groupingSummary: {
                dataFields: ['AREA_VNOR_SALE_AMT', 'COMPONENT_RATE', 'S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'NATIVE_AMT', 'FOREIGNER_AMT']
		    },
            // groupingSummary 속성을 설정하였을 때 합계 필드에 출력되는 텍스트를 지정합니다.@defaultValue "합계" 
            summaryText:'소계',
            // 그룹핑 후 셀 병함 실행
            enableCellMerge: true,
            // enableCellMerge 할 때 실제로 rowspan 적용 시킬지 여부
		    // 만약 false 설정하면 실제 병합은 하지 않고 데이터 값만 같은 데이터 출력 시키지 않음. (기본값 : true)
            cellMergeRowSpan: true,
            showFooter: true,
            rowStyleFunction: (rowIndex, item) => {
                if (item._$isGroupSumField) {
                    // 그룹핑으로 만들어진 합계 필드인지 여부
                    // 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
                    // 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
                    switch (
                        item._$depth // 계층형의 depth 비교 연산
                    ) {
                        case 2:
                            return 'aui-grid-row-depth1-style';
                        case 3:
                            return 'aui-grid-row-depth2-style';
                        case 4:
                            return 'aui-grid-row-depth3-style';
                        default:
                            return 'aui-grid-row-depth-default-style';
                    }
                }
                return null;
            }
        };

    useEffect(() => {
            if (searchData) {
                grid.setGridData(searchData);
            }
        }, [searchData, grid]);

    return (
        <div className="flex flex-col w-full h-full">
            <PageToolbar
                onSearch={() => searchPrograms(params)} 
                onExcel={() => grid.exportToXlsx({ fileName: '지역별매출회원현황_'+ dayjs().format('YYYYMMDDHHmmss'), isRowStyleFront: false , progressBar: true }) }
            />
            
            <section className="w-full h-full flex flex-col rounded border border-gray-200 bg-white mb-2 shadow-sm overflow-hidden flex-1 min-h-0">
                <div className="flex-1 min-h-0">
                    <div className="ag-theme-alpine h-full w-full">
                        <AUIGrid ref={myGrid} columnLayout={columnLayout} gridProps={gridProps} footerLayout={getFooterLayout()}/>
                    </div>
                </div>
            </section>
        </div>
    );
}
