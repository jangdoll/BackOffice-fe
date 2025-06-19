const menuList = [
  "공통업무", "본부운영", "거래처EDI", "영업관리", "영업지원관리", "POS관리", "시스템관리", "협력사EDI", "마이메뉴"
];

const FrameHeaderMenu = () => {
  return (
    <nav className="w-full bg-slate-100 border-b border-slate-200 flex items-center px-4 h-12 overflow-x-auto">
      {menuList.map((m, i) => (
        <div
          key={m}
          className="flex items-center px-4 h-full cursor-pointer hover:bg-sky-100 text-base font-medium transition whitespace-nowrap"
        >
          {m}
        </div>
      ))}
    </nav>
  );
};
export default FrameHeaderMenu;
