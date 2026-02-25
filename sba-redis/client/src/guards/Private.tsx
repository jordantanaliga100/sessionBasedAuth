import { Navigate, Outlet } from "react-router";
import { Loaders } from "../components/Loader";
import { useAuth } from "../hooks/useAuth";

const PrivateRoute = () => {
  const { user, isLoading } = useAuth();

  // Habang nagche-check pa sa Redis, wag muna mag-render
  if (isLoading) return <Loaders />;

  // Pag walang user, redirect sa sign-in
  return user ? <Outlet /> : <Navigate to="/a" replace />;
};

export default PrivateRoute;
