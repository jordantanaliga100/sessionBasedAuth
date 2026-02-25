import { Navigate, Outlet } from "react-router";
import { Loaders } from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

const PublicRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return <Loaders />;

  // Pag may user na, redirect sa home (Dashboard)
  return !user ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoute;
