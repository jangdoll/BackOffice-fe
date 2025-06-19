import { useAuthStore } from "../store/authStore";
import { useTabStore } from "../store/tabStore";
import { FiMenu } from "react-icons/fi";

interface Props {
  gnbMenus: string[];
  selectedGnb: string;
  onSelectGnb: (menu: string) => void;
  asideOpen: boolean;
  onToggleAside: () => void;
}

export default function FrameHeader({
  gnbMenus,
  selectedGnb,
  onSelectGnb,
  asideOpen,
  onToggleAside,
}: Props) {
  const logout = useAuthStore(s => s.logout);
  const resetTabs = useTabStore(s => s.resetTabs);
  const userId = useAuthStore(s => s.userId);

  return (
    <header className="h-18 min-h-[72px] bg-white border-b border-gray-200 flex items-center justify-between pr-6 pl-3 z-40 shadow-sm">
      <div className="flex items-center text-center space-x-3">
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
        <span className="w-[135px] text-[24px] font-bold text-[#2563eb] tracking-tight">
          BackOffice
        </span>
      </div>
      <nav className="flex-1 ml-8 hidden md:block">
        <ul className="flex space-x-1">
          {gnbMenus.map(menu => (
            <li key={menu}>
              <button
                type="button"
                onClick={() => onSelectGnb(menu)}
                className={`px-5 py-2 rounded-md text-base font-semibold transition-all
                  ${selectedGnb === menu
                    ? "bg-[#e7eaf8] text-[#2563eb] shadow font-bold"
                    : "text-gray-800 hover:bg-[#e7eaf8]"}
                `}
              >
                {menu}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4">
        <span className="text-[#2563eb] font-semibold hidden sm:block text-base">
          {userId}
        </span>
        <button
          className="bg-[#f7f7fa] border border-gray-200 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
          onClick={() => {
            logout();
            resetTabs();
          }}
        >
          로그아웃
        </button>
      </div>
    </header>
  );
}
