import { FiSearch, FiPlus, FiSave, FiFileText, FiTrash2, FiX } from "react-icons/fi";
import type { ComponentType } from "react";

export type PageButtonKey = "search" | "new" | "save" | "excel" | "del" | "close";

export interface PageButtonConfig {
  key: PageButtonKey;
  label: string;
  icon: ComponentType<any>;  // <-- ReactNode에서 ComponentType<any>로!
  color: string;
  auth: "auth_inq" | "auth_new" | "auth_save" | "auth_excel" | "auth_del" | "always";
}

export interface MenuConfig {
  path: string;
  label: string;
  buttons: PageButtonConfig[];
}

export const MENU_CONFIG: MenuConfig[] = [
  {
    path: "/bass20001",
    label: "프로그램 관리",
    buttons: [
      { key: "search", label: "조회", icon: FiSearch, color: "btn-blue", auth: "auth_inq" },
      { key: "new", label: "신규", icon: FiPlus, color: "btn-green", auth: "auth_new" },
      { key: "save", label: "저장", icon: FiSave, color: "btn-green", auth: "auth_save" },
      { key: "excel", label: "엑셀", icon: FiFileText, color: "btn-green", auth: "auth_excel" },
      { key: "del", label: "삭제", icon: FiTrash2, color: "btn-red", auth: "auth_del" },
      { key: "close", label: "닫기", icon: FiX, color: "btn-red", auth: "always" },
    ],
  },
  // ...다른 메뉴
];
