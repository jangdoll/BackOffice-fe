// LoginPage.tsx

import React, { useState } from "react";
import { loginApi } from "../api/auth";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

// const PRIMARY = "#2563eb"; // 은은한 블루, Tailwind 기준 blue-600

const LoginPage: React.FC = () => {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = await loginApi(loginId, password);
      setToken(token, rememberMe, loginId);
      navigate("/");
    } catch (err: any) {
      setError("로그인 실패: " + err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-100 via-white to-gray-100">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 px-8 py-10 flex flex-col items-center mx-4">
          {/* 상단 브랜드/타이틀 */}
          <div className="mb-8 w-full flex flex-col items-center">
            <span className="font-extrabold text-2xl tracking-tight text-gray-900 select-none">
              BackOffice
            </span>
            <span className="text-gray-500 text-lg mt-1 font-medium select-none">
              BackOffice Login
            </span>
          </div>
          <form className="w-full" onSubmit={handleLogin} autoComplete="off">
            <div className="flex flex-col gap-3">
              <input
                type="text"
                id="id"
                title="ID"
                value={loginId}
                onChange={e => setLoginId(e.target.value)}
                placeholder="아이디"
                autoFocus
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none bg-gray-50"
                disabled={loading}
                autoComplete="username"
              />
              <input
                type="password"
                id="password"
                title="PASSWORD"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="비밀번호"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none bg-gray-50"
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            <div className="flex items-center mt-3 mb-2">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="accent-blue-500 w-5 h-5"
                title="자동 로그인"
                disabled={loading}
              />
              <label htmlFor="rememberMe" className="text-gray-600 text-base ml-2 select-none">
                아이디 저장
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold py-3 mt-2 rounded-lg transition-all duration-150 disabled:opacity-60 shadow"
              id="loginbtn"
              title="login"
              disabled={loading}
            >
              {loading ? "로그인 중..." : "로그인"}
            </button>
            {error && <div className="mt-3 text-red-500 text-sm font-semibold text-center">{error}</div>}
          </form>
        </div>
      </div>
      <footer className="w-full text-center py-6 bg-transparent text-gray-400 text-[15px] select-none font-light">
        Copyright © 2025 BackOffice
      </footer>
    </div>
  );
};

export default LoginPage;
