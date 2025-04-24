import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Home from "./pages/Home.tsx";
import ViewMyTask from "./pages/ViewMyTask.tsx";
import CreateTask from "./pages/CreateTask.tsx";
import Login from "./pages/Login.tsx";
import CreateAccount from "./pages/CreateAccount.tsx";
import Authentication from "./contexts/Authentication.tsx";
import { ThemeProvider } from "./contexts/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Router>
      <Authentication>
        <ThemeProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/cadastrar" element={<CreateAccount />} />
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="/tarefa/:taskId" element={<ViewMyTask />} />
              <Route path="/criar-tarefa" element={<CreateTask />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </Authentication>
    </Router>
  </StrictMode>
);
