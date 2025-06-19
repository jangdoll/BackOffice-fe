import FrameHeader from "./FrameHeader";
import FrameAside from "./FrameAside";
import FrameHeaderTab from "./FrameHeaderTab";
import FrameContent from "./FrameContent";
import FrameFooter from "./FrameFooter";
import { useState } from "react";

const GNB_MENUS = [
  "공통업무", "본부운영", "거래처EDI", "영업관리", "영업지원관리", "POS관리", "시스템관리", "협력사EDI", "마이메뉴"
];

export function FrameRoot() {
  const [selectedGnb, setSelectedGnb] = useState('공통업무');
  const [asideOpen, setAsideOpen] = useState(true);

  return (
    <div className="flex flex-col w-full h-screen max-h-screen bg-gray-50 overflow-hidden">
      <FrameHeader
        gnbMenus={GNB_MENUS}
        selectedGnb={selectedGnb}
        onSelectGnb={setSelectedGnb}
        asideOpen={asideOpen}
        onToggleAside={() => setAsideOpen(v => !v)}
      />
      <div className="flex flex-1 min-h-0 w-full">
        {/* Aside width/visible 처리 */}
        <div
          className={`transition-all duration-300 h-full flex-shrink-0`}
          style={{
            width: asideOpen ? 220 : 0,  // px 단위로 width 고정
            minWidth: asideOpen ? 220 : 0,
            overflow: "hidden",
          }}
        >
          <FrameAside
            selectedGnb={selectedGnb}
            open={asideOpen}
          />
        </div>
        {/* Content */}
        <div className="flex-1 flex flex-col bg-gray-50 min-w-0 min-h-0">
          <FrameHeaderTab />
          <FrameContent />
          <FrameFooter />
        </div>
      </div>
    </div>
  );
}
