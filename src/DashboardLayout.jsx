import { Route, Routes } from "react-router-dom";
import { AppSidebar } from "./components/ui/app-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";
import SearchPage from "./pages/search";
import CategotyPage from "./pages/category";
import FavoritePage from "./pages/favorite";
import ContatoPage from "./pages/contact";
import MovieSelected from "./pages/movieSolo";
import CategoriaSelecionada from "./pages/categorySelected";
import HomeDashboardPage from "./pages/home_dashboard";

{
    /* <Route path="/CategotyPage" element={<CategotyPage />} />
            <Route
                path="/CategoriaSelecionada/:id"
                element={<CategoriaSelecionada />}
            />
            <Route path="/MovieSelected/:id" element={<MovieSelected />} />

            <Route path="/FavoritePage" element={<FavoritePage />} />
            <Route path="/ContatoPage" element={<ContatoPage />} /> */
}

export default function DashboardLayout() {
    return (
        <SidebarProvider
            style={{
                "--sidebar-width": "16rem", //para alterar o width da sidebar
                "--sidebar-width-mobile": "16rem", //para alterar o width da sidebar
            }}
        >
            <AppSidebar />
            <div>
                <Routes>
                    <Route path="/" element={<HomeDashboardPage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/categories" element={<CategotyPage />} />
                    <Route
                        path="/categories/:id"
                        element={<CategoriaSelecionada />}
                    />
                    <Route path="/favorites" element={<FavoritePage />} />
                    <Route path="/contact" element={<ContatoPage />} />
                    <Route path="/movies/:id" element={<MovieSelected />} />
                </Routes>
            </div>
        </SidebarProvider>
    );
}
