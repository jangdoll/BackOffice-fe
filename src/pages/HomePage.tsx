import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-700 to-sky-500">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-lg px-10 py-12 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-white mb-6">홈페이지</h1>
        <p className="text-white text-lg mb-10">환영합니다! <br />토큰: <span className="break-all">{token}</span></p>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white px-6 py-3 rounded-xl text-lg font-bold shadow transition"
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};
export default HomePage;
