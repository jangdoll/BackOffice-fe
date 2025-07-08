//FrameAside.tsx

import { useTabStore } from "../store/tabStore";
import { useLocation } from "react-router-dom";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import { useState } from "react";

// [메뉴 정의]
type MenuItem = {
  label: string;
  to?: string;
  children?: MenuItem[];
};

const MENU_MAP: Record<string, MenuItem[]> = {
  "공통업무": [
    {
      label: "공통정보",
      children: [
        { label: "통합코드등록", to: "/dashboard" },
        { label: "상권지역(마케팅)", to: "/sale" },
        { label: "세금정보관리", to: "/test" },
      ],
    },
    {
      label: "커뮤니티관리",
      children: [
        { label: "마케팅 현황", to: "/market-status" },
        { label: "지역별 분석", to: "/market-area" },
      ],
    },
    { label: "마이메뉴", to: "/mymenu" },
  ],
  "영업지원관리": [
    {
      label: "고객관리",
      children: [
        { label: "회원관리",
          children: [
            { label: "지역별매출회원현황", to: "/baos13009" },
          ],
        },
        { label: "포인트운영"},
        { label: "포인트현황"},
        { label: "주차관리"},
      ],
    },
  ],
  "시스템관리": [
    {
      label: "프로그램관리",
      children: [
        { label: "프로그램 관리", to: "/bass20001" },
        { label: "메뉴관리(트리)", to: "/bass20003" },
      ],
    },
  ],
};

// 계층별 인덴트 스타일(레벨별 왼쪽 마진)
const indent = (level: number) => `pl-${4 + 4 * level}`;

// 스타일 커스텀
function AccordionMenu({
  menus,
  level = 0,
  currentPath,
  onMenuClick,
  activeKey
}: {
  menus: MenuItem[];
  level?: number;
  currentPath: string;
  onMenuClick: (item: MenuItem) => void;
  activeKey: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <ul className={level === 0 ? "space-y-1" : "space-y-0"}>
      {menus.map((item, i) => {
        const childActive = item.children?.some(c => c.to === activeKey);
        const isActive = item.to === activeKey;
        const isOpen = openIndex === i || childActive;

        // 레벨별 스타일(1뎁스-2뎁스-3뎁스)
        let base =
          "flex items-center cursor-pointer transition group select-none";

        let style: React.CSSProperties = {};
        let classNames = "";
        if (level === 0) {
          // 1뎁스
          classNames =
            "py-2 px-4 rounded-lg border-l-4 font-semibold text-base " +
            (isActive
              ? "bg-[#e7eaf8] text-[#2563eb] border-[#2563eb] shadow"
              : childActive
              ? "bg-[#f4f8fd] text-[#2563eb] border-[#80aaff] font-bold"
              : "hover:bg-[#f3f6fa] text-gray-800 border-transparent");
        } else {
          // 2뎁스 이상
          classNames =
            `ml-${level * 2} py-1.5 px-4 rounded-md border-l-2 text-sm ` +
            (isActive
              ? "bg-[#e3eefb] text-[#2563eb] border-[#2563eb] font-semibold"
              : "hover:bg-[#edf5fd] hover:text-[#2563eb] text-gray-700 border-transparent");
          style = {
            marginLeft: level === 1 ? 14 : 24, // 실제로 ml-4, ml-6 정도
            background: isActive
              ? "#e3eefb"
              : level === 1
              ? "#f7fafd"
              : "#fff",
          };
        }

        return (
          <li key={item.label}>
            <div
              className={`${base} ${classNames}`}
              style={style}
              onClick={() => {
                if (item.children) setOpenIndex(isOpen ? null : i);
                else if (item.to) onMenuClick(item);
              }}
            >
              {item.children ? (
                <>
                  {isOpen ? (
                    <FiChevronDown className="mr-2 text-[17px]" />
                  ) : (
                    <FiChevronRight className="mr-2 text-[17px]" />
                  )}
                  <span>{item.label}</span>
                </>
              ) : (
                <span>{item.label}</span>
              )}
            </div>
            {/* 하위 메뉴 */}
            {item.children && isOpen && (
              <AccordionMenu
                menus={item.children}
                level={level + 1}
                currentPath={currentPath}
                onMenuClick={onMenuClick}
                activeKey={activeKey}
              />
            )}
            {/* 뎁스별 그룹 구분선(1뎁스 아래) */}
            {level === 0 && i < menus.length - 1 && (
              <div className="h-[1px] bg-gray-100 my-0.5 mx-3" />
            )}
          </li>
        );
      })}
    </ul>
  );
}

export default function FrameAside({
  selectedGnb,
  open = true,
  headerHeight = 55, // 기본값
}: {
  selectedGnb: string;
  open?: boolean;
  headerHeight?: number;
}) {
  const location = useLocation();
  const { openTab, activeKey } = useTabStore();
  const menus = MENU_MAP[selectedGnb] || [];

  const handleMenuClick = (item: MenuItem) => {
    if (!item.to) return;
    openTab({ key: item.to, title: item.label, path: item.to });
  };

  return (
    <aside
      className={`
        w-[220px] min-h-0 bg-white border-r border-gray-200 text-gray-800 flex flex-col shadow-md select-none z-20
        fixed md:static left-0 transition-all duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        sm:hidden md:flex
      `}
      style={{
        willChange: "transform",
        top: headerHeight,
        height: `calc(100vh - ${headerHeight}px)`,
      }}
    >
      <nav className="flex-1 pt-1 pb-6 px-2">
        {menus.length === 0
          ? <div className="text-gray-400 px-4 py-2">메뉴 없음</div>
          : <AccordionMenu
              menus={menus}
              currentPath={location.pathname}
              onMenuClick={handleMenuClick}
              activeKey={activeKey}
            />}
      </nav>
    </aside>
  );
}
