import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f7f7f7]">
        <ClipLoader size={40} color="#000000" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return isAdmin ? <Outlet /> : <Navigate to="/" replace />;
}