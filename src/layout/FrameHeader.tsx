import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/authStore";
import { useTabStore } from "../store/tabStore";
import { FiMenu } from "react-icons/fi";

interface Props {
  gnbMenus: string[];
  selectedGnb: string;
  onSelectGnb: (menu: string) => void;
  asideOpen: boolean;
  onToggleAside: () => void;
  onHeaderHeightChange?: (height: number) => void; // 추가
}

export default function FrameHeader({
  gnbMenus,
  selectedGnb,
  onSelectGnb,
  asideOpen,
  onToggleAside,
  onHeaderHeightChange,
}: Props) {
  const logout = useAuthStore(s => s.logout);
  const resetTabs = useTabStore(s => s.resetTabs);
  const userId = useAuthStore(s => s.userId);

  const headerRef = useRef<HTMLDivElement>(null);

  // 헤더 높이 변경될 때마다 부모로 알림
  useEffect(() => {
    if (!onHeaderHeightChange || !headerRef.current) return;
    onHeaderHeightChange(headerRef.current.offsetHeight);
    // 리사이즈에도 동기화
    const resize = () => onHeaderHeightChange(headerRef.current!.offsetHeight);
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [onHeaderHeightChange]);

  return (
    <header
      ref={headerRef}
      className="bg-white border-b border-gray-200 z-40 shadow-sm"
    >
      {/* 1줄: 햄버거 | BackOffice | 메뉴 | id | 로그아웃 */}
      <div className="flex items-center justify-between pr-4 pl-2 h-[55px] min-h-[55px] w-full">
        {/* 왼쪽: 햄버거 + 로고 */}
        <div className="w-[200px] flex items-center space-x-2 min-w-0">
          <button
            onClick={onToggleAside}
            className={`text-1xl p-2 rounded transition
              ${asideOpen
                ? "text-[#2563eb] bg-[#e7eaf8] shadow"
                : "text-gray-500 hover:text-[#2563eb] hover:bg-gray-100"}
            `}
            aria-label="사이드 메뉴 토글"
          >
            <FiMenu />
          </button>
          <span className="text-[24px] text-center font-bold text-[#2563eb] tracking-tight whitespace-nowrap">
            BackOffice
          </span>
        </div>
        {/* 가운데: 메뉴 (PC only) */}
        <nav className="flex-1 mx-4 hidden md:block min-w-0">
          <ul className="flex flex-row flex-nowrap gap-x-1 items-center overflow-x-auto">
            {gnbMenus.map(menu => (
              <li key={menu}>
                <button
                  type="button"
                  onClick={() => onSelectGnb(menu)}
                  className={`px-5 py-3 rounded-md text-base font-semibold transition-all
                    ${selectedGnb === menu
                      ? "bg-[#e7eaf8] text-[#2563eb] shadow font-bold"
                      : "text-gray-800 hover:bg-[#e7eaf8]"}`}
                >
                  {menu}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        {/* 오른쪽: 아이디/로그아웃 */}
        <div className="flex items-center space-x-4 min-w-0">
          <span className="text-[#2563eb] font-semibold hidden sm:block text-base truncate max-w-[120px]">
            {userId}
          </span>
          <button
            className="bg-[#f7f7fa] border border-gray-200 px-3 py-1 rounded-md text-gray-700 hover:bg-gray-100"
            onClick={() => {
              logout();
              resetTabs();
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
      {/* 모바일: 메뉴 아래 한 줄 가로 스크롤 */}
      <nav className="md:hidden w-full border-t border-gray-100 bg-white overflow-x-auto">
        <ul className="flex flex-nowrap gap-x-1 px-2 py-2 min-w-[400px]">
          {gnbMenus.map(menu => (
            <li key={menu} className="flex-none">
              <button
                type="button"
                onClick={() => onSelectGnb(menu)}
                className={`px-4 py-2 rounded-md text-sm font-semibold transition-all
                  ${selectedGnb === menu
                    ? "bg-[#e7eaf8] text-[#2563eb] shadow font-bold"
                    : "text-gray-800 hover:bg-[#e7eaf8]"}`}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
