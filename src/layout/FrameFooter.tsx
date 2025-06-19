// FrameFooter.tsx
import { useLocation } from "react-router-dom";

const FrameFooter = () => {
  const location = useLocation();
  const programId = location.pathname; // ex: /bass20001

  return (
    <footer className="h-10 w-full bg-white border-t border-gray-200 flex items-center justify-between px-6 text-gray-400 text-xs md:text-sm">
      <span>
        PGM ID : <span>{programId}</span>
      </span>
      <span>Back Office System © 2025</span>
    </footer>
  );
};

export default FrameFooter;
