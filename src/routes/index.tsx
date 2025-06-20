import { Routes, Route, Navigate } from "react-router-dom";
import { FrameRoot } from "../layout/FrameRoot";
import LoginPage from "../pages/LoginPage";
import { useAuthStore } from "../store/authStore";
import DashboardPage from "../pages/DashboardPage";
import NotFoundPage from "../pages/NotFoundPage";
import ProgramManagerPage from "../pages/ProgramManagerPage";

function RequireAuth({ children }: { children: React.ReactNode }) {
  const token = useAuthStore(s => s.token);
  return token ? children : <Navigate to="/login" />;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <RequireAuth>
            <FrameRoot />
          </RequireAuth>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="sale" element={<NotFoundPage />} />
        <Route path="bass20001" element={<ProgramManagerPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
