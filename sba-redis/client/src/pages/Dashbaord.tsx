// pages/Dashboard.tsx
import { useNavigate } from "react-router";
import api from "../api/axios"; // Import ng axios instance mo
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  // ✨ Kunin ang user data at logout function mula sa context
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // ✨ 1. Tawagin ang logout endpoint sa backend para burahin ang session sa Redis
      console.log("hit");

      await api.post("/auth/logout");

      // ✨ 2. I-clear ang user state sa frontend
      logout();

      // ✨ 3. I-redirect sa login page
      navigate("/a");
    } catch (error) {
      console.error("Logout failed", error);
      // Pwede ka mag-add ng toast notification dito kung gusto mo
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* 👤 Profile Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-zinc-950">
            Welcome Back, {user?.username}!
          </h2>
          <p className="text-zinc-600">
            Email:{" "}
            <span className="font-semibold text-zinc-900">{user?.email}</span>
          </p>
        </div>

        {/* ✨ Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          Logout
        </button>
      </div>

      {/* 📊 Content Area */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="border rounded-lg p-5 bg-white shadow-sm">
          <p className="text-sm text-zinc-500">Role</p>
          <p className="text-xl font-bold text-zinc-900 capitalize">
            {user?.role}
          </p>
        </div>

        <div className="border rounded-lg p-5 bg-white shadow-sm">
          <p className="text-sm text-zinc-500">User ID</p>
          <p className="text-lg font-mono text-zinc-700 truncate">{user?.id}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
