import { Navigate, Route, Routes } from "react-router";
import PublicRoute from "./guards/Public";
import Auth from "./layout/Auth";
import Home from "./layout/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  // return <pre>Session Based Auth</pre>;
  return (
    <Routes>
      {/* <Route element={<PrivateRoute />}>
        <Route index element={<Home />} />
      </Route> */}
      <Route path="/" element={<Home />} />
      <Route element={<PublicRoute />}>
        <Route path="a" element={<Auth />}>
          <Route index element={<SignIn />} />
          <Route path="r" element={<SignUp />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
