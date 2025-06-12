import { Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

export function NavbarAdmin() {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();

  return (
    <header className="fixed top-0 left-0 w-screen h-16 bg-[#292F42] px-4 flex items-center justify-between shadow-md z-50 text-white">
      <button className="text-xl font-semibold pl-2" onClick={() => navigate('/admin')}>Administración</button>

      <div className="flex items-center gap-6 mr-10">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-white/10 transition"
          aria-label="Alternar tema"
        >
          {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-2 cursor-pointer">
              <Avatar>
                {user ? (
                  <>
                    <AvatarImage src={user.avatarUrl} alt="@usuario" />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </>
                ) : (
                  <AvatarFallback> <span className="text-black dark:text-white">U</span></AvatarFallback>
                )}
              </Avatar>
              {user && <span className="text-sm font-medium">{user.name}</span>}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => console.log("Perfil")}>Perfil</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
