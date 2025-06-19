// src/layout/FrameHeaderTab.tsx
import { useTabStore } from '../store/tabStore';

export default function FrameHeaderTab() {
  const { tabs, activeKey, setActive, closeTab } = useTabStore();

  return (
    <div className="flex h-8 bg-white border-b border-gray-200 items-end px-2 overflow-x-auto whitespace-nowrap z-30">
      {tabs.map(tab => {
        const isActive = activeKey === tab.key;
        return (
          <div
            key={tab.key}
            className={`
              flex items-center h-8 px-5 rounded-t-md cursor-pointer transition select-none text-sm
              ${isActive
                ? "bg-[#2563eb] text-white font-bold shadow border-x border-t border-[#2563eb]"
                : "bg-[#f7f7f8] text-gray-700 border border-transparent hover:bg-[#e9ecef]"
              }
            `}
            style={{
              borderBottom: isActive ? "none" : "2px solid transparent",
              // 아래로 내려가는 게 아니라 "탭 전체"에 색이 깔리도록!
            }}
            onClick={() => setActive(tab.key)}
          >
            <span className="truncate max-w-[120px]">{tab.title}</span>
            {tab.key !== '/' && (
              <button
                className={`
                  ${isActive 
                    ? "text-white hover:text-[#222] ml-2 text-base transition-colors"
                    : "text-[#2563eb] hover:text-[#222] ml-2 text-base transition-colors"
                  }
                `}
                style={{ opacity: isActive ? 0.9 : 0.5 }}
                onClick={e => {
                  e.stopPropagation();
                  closeTab(tab.key);
                }}
                tabIndex={-1}
              >×</button>
            )}
          </div>
        );
      })}
    </div>
  );
}
