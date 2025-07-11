// src/components/PageToolbar.tsx
import { useLocation } from "react-router-dom";
import { useMemo } from "react";
import { MENU_CONFIG } from "../config/menuConfig";
import { PageButton } from "./PageButton";
import { useTabStore } from "../store/tabStore";
import { useAuthStore } from "../store/authStore";

type PageToolbarProps = {
  onSearch?: () => void;
  onNew?: () => void;
  onSave?: () => void;
  onExcel?: () => void;
  onDel?: () => void;
  // ...다른 버튼에 맞게 추가
};

export function PageToolbar({ onSearch, onNew, onSave, onExcel, onDel }: PageToolbarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { closeTab } = useTabStore();
  const userAuth = useAuthStore((state) => state.userAuth);

  // 해당 path 메뉴 찾기 (startsWith로 하위 메뉴 지원)
  const menu = useMemo(
    () => MENU_CONFIG.find((m) => currentPath.startsWith(m.path)),
    [currentPath]
  );
  if (!menu) return null;

  // 권한 체크(필터링)
  const buttons = menu.buttons.filter((btn) => userAuth[btn.auth] === true);

  return (
    <div className="flex items-start justify-between mb-3 px-1">
      <h1 className="text-xl font-bold text-gray-700 flex items-center gap-2">
        <span className="text-base text-[#005cab] mt-[2px]">{menu.label}</span>
      </h1>
      <div className="flex gap-1">
        {buttons.map((btn) => (
          <PageButton
            key={btn.key}
            label={btn.label}
            icon={btn.icon}
            color={btn.color}
            onClick={() => {
              if (btn.key === "search" && onSearch) onSearch();
              else if (btn.key === "new" && onNew) onNew();
              else if (btn.key === "save" && onSave) onSave();
              else if (btn.key === "excel" && onExcel) onExcel();
              else if (btn.key === "del" && onDel) onDel();
              else if (btn.key === "close") closeTab(currentPath);;
            }}
          />
        ))}
      </div>
    </div>
  );
}
