// auigrid-utils.ts

import type AUIGrid from "../components/AUIGridReact";

// 2. 실제 함수 구현
/**
 * AUIGrid에서 CRUD_FLAG 기반으로 상태가 변경된(추가, 수정, 삭제) row만 반환하는 함수
 * @param grid AUIGrid의 ref.current 또는 인스턴스
 * @returns 상태가 변경된 row 배열
 */
export function getChangedRows(grid: AUIGrid|null): any[] {
  if (!grid || typeof grid.getGridDataWithState !== "function") return [];

  const result = grid.getGridDataWithState(
    "CRUD_FLAG",
    { added: "I", edited: "U", removed: "D" }
  );

  // CRUD_FLAG가 존재하는 row만 반환
  return Array.isArray(result)
    ? result.filter(row => row?.CRUD_FLAG)
    : [];
}