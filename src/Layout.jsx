import { Routes, Route } from "react-router-dom";
import InicialPage from "./pages/PaginaInicial";
import DashboardLayout from "./DashboardLayout";
import LoginPage from "./pages/login";

export default function Layout() {
  return (
    <Routes>
      <Route path="/" element={<InicialPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="dashboard/*" element={<DashboardLayout />} />
    </Routes>
  );
}

//na main eu criei a rotas da minha pagina
