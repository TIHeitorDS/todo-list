import { Outlet, useNavigate } from "react-router";
import { useLogin } from "./hooks/useLogin";
import { useEffect } from "react";

function App() {
  const { user } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);

  return (
    <div className="w-11/12 h-screen mx-auto p-4">
      <Outlet />
    </div>
  );
}

export default App;
