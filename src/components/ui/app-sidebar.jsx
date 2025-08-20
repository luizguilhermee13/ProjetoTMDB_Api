import { Tags, Home, Mail, Search, Heart } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Link } from "react-router-dom";
// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Search",
    url: "/dashboard/search",
    icon: Search,
  },
  {
    title: "Categorias",
    url: "/dashboard/categories",
    icon: Tags,
  },
  {
    title: "Favoritos",
    url: "/dashboard/favorites",
    icon: Heart,
  },
  {
    title: "Contato",
    url: "/dashboard/contact",
    icon: Mail,
  },
];

export function AppSidebar() {
  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center md:text-[0.8em] sm:text-[10px] ">
          <label>Usuario teste</label>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
