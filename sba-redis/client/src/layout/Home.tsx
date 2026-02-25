// import { Link } from "react-router";
// import { Button } from "../components/ui/button";
// import { useAuth } from "../hooks/useAuth";

import { Link } from "react-router";
import { Loaders } from "../components/Loader";
import { Button } from "../components/ui/button";
import { useAuth } from "../hooks/useAuth";

// export default function Home() {
//   const { user } = useAuth();

//   return (
//     <div className="text-xl p-4 rounded-md flex flex-col items-start gap-4">
//       <h1 className="text-2xl font-bold flex justify-center items-center ">
//         <pre>SBA-</pre>
//         <span className="font-normal text-sm  text-black">
//           Session Based Auth
//         </span>
//       </h1>
//       <pre className="text-sm">a session based auth with redis </pre>
//       {user && (
//         <pre className="animate-in fade-in slide-in-from-left-1 duration-500">
//           Hi, {user.username}!
//         </pre>
//       )}
//       <Link to="/a">
//         <Button>Get Started</Button>
//       </Link>
//     </div>
//   );
// }

export default function Home() {
  const { user, isLoading } = useAuth(); // Siguraduhin mong may isLoading ang hook mo

  // 1. Habang chine-check ang Redis session, ipakita ang loading screen
  // para hindi muna lumabas yung "Get Started" button (Anti-Blink)
  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loaders />
      </div>
    );
  }

  // 2. Kung Logged In (Dashboard View)
  if (user) {
    return (
      <div className="animate-in fade-in duration-500">
        {/* Dito mo ilagay yung Sidebar, Products, Users etc. */}
        <nav>Sidebar - Products - Users</nav>
        <h1>Welcome, {user.username}!</h1>
      </div>
    );
  }

  // 3. Kung Public / Guest (Landing Page View)
  return (
    <div className="text-xl p-4 flex flex-col items-start gap-4 animate-in fade-in">
      <h1 className="text-2xl font-bold flex">
        <pre>SBA-</pre>
        <span className="font-normal text-sm text-black">
          Session Based Auth
        </span>
      </h1>
      <pre className="text-sm">a session based auth with redis</pre>
      <Link to="/a">
        <Button>Get Started</Button>
      </Link>
    </div>
  );
}
