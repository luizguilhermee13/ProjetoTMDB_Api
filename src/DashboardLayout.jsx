import { Route, Routes } from "react-router-dom";
import { AppSidebar } from "./components/ui/app-sidebar";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "./components/ui/sidebar";
import SearchPage from "./pages/search";
import CategotyPage from "./pages/category";
import FavoritePage from "./pages/favorite";
import ContatoPage from "./pages/contact";
import MovieSelected from "./pages/movieSolo";
import CategoriaSelecionada from "./pages/categorySelected";
import HomeDashboardPage from "./pages/home_dashboard";

export default function DashboardLayout() {
  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "16rem", // para alterar o width da sidebar
        "--sidebar-width-mobile": "16rem", // para alterar o width da sidebar no mobile
      }}
    >
      {/* 1. Barra lateral do shadcn */}
      <AppSidebar />

      {/* Área principal que se ajusta automaticamente ao encolher/expandir a sidebar 
      contendo o botão de alternar (SidebarTrigger)*/}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>

        {/* Área onde as páginas do app serão renderizadas */}
        <div className="flex flex-1 flex-col gap-4 ">
          <Routes>
            <Route path="/" element={<HomeDashboardPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/categories" element={<CategotyPage />} />
            <Route path="/categories/:id" element={<CategoriaSelecionada />} />
            <Route path="/favorites" element={<FavoritePage />} />
            <Route path="/contact" element={<ContatoPage />} />
            <Route path="/movies/:id" element={<MovieSelected />} />
          </Routes>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
