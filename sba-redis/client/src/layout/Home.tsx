// // import { Link } from "react-router";
// // import { Button } from "../components/ui/button";
// // import { useAuth } from "../hooks/useAuth";

// import { Loaders } from "../components/Loader";
// import { useAuth } from "../hooks/useAuth";

// export default function Home() {
//   const { user, isLoading } = useAuth(); // Siguraduhin mong may isLoading ang hook mo

//   // 1. Habang chine-check ang Redis session, ipakita ang loading screen
//   // para hindi muna lumabas yung "Get Started" button (Anti-Blink)
//   if (isLoading) {
//     return (
//       <div className="flex h-screen w-full items-center justify-center">
//         <Loaders />
//       </div>
//     );
//   }

//   // 2. Kung Logged In (Dashboard View)
//   if (user) {
//     return (
//       <div className="animate-in fade-in duration-500">
//         {/* Dito mo ilagay yung Sidebar, Products, Users etc. */}
//         <nav>Sidebar - Products - Users</nav>
//         <h1>Welcome, {user.username}!</h1>
//       </div>
//     );
//   }

//   // 3. Kung Public / Guest (Landing Page View)
//   return (
//     <div className="text-xl p-4 flex flex-col items-center justify-center h-full gap-4 animate-in fade-in">
//       <h1 className="text-5xl font-extrabold  text-zinc-950 flex">
//         <h1 className="text-5xl text-zinc-900">SBA-</h1>
//         <span className="text-5xl text-zinc-900 font-extrabold ">
//           Session Based Auth
//         </span>
//       </h1>
//       <p className="text-1xl text-zinc-700">
//         a session based auth with redis and postgres
//       </p>
//     </div>
//   );
// }

// layout/Home.tsx
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
