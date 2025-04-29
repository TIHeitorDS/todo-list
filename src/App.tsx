import { Outlet, Navigate } from "react-router";
import { useLogin } from "./hooks/useLogin";

function App() {
  const { authenticatedUser: user } = useLogin();

  return (
    <div className="w-11/12 h-screen mx-auto p-4">
      {user ? <Outlet /> : <Navigate to="/login" />}
    </div>
  );
}

export default App;
