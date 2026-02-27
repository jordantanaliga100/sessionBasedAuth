import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="flex min-h-screen w-full">
      {/* 👈 Left Side */}
      <div className="w-1/4 bg-zinc-100 p-4">
        <h2 className="font-bold">Dashboard</h2>
        {/* Navigation links here */}
      </div>

      {/* 👉 Right Side */}
      <div className="w-3/4 p-4">
        <Outlet /> {/* ✨ Main Content ✨ */}
      </div>
    </div>
  );
};

export default HomeLayout;
