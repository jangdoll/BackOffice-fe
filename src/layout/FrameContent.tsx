import { useTabStore } from "../store/tabStore";
import { useEffect, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function FrameContent() {
  const { activeKey } = useTabStore();
  const navigate = useNavigate();
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeKey) navigate(activeKey, { replace: true });
  }, [activeKey, navigate]);

  // 전체 레이아웃 내부에서만 스크롤, 높이 맞춤
  return (
    <main
      ref={mainRef}
      className="flex-1 px-3 pt-3 bg-gray-50 min-h-0 overflow-auto"
      style={{ height: '100%', maxHeight: '100%' }}
    >
      <Outlet />
    </main>
  );
}
