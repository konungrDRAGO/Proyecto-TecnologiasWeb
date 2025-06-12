import { Bell, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useTheme } from "@/context/ThemeContext";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";

type Notification = {
  name: string
  price: string
  oldPrice: string
  store: string
}

const notifications: Notification[] = [
  {
    name: "Chocapic",
    price: "$1000",
    oldPrice: "$1500",
    store: "Unimarc",
  },
  {
    name: "Tallarin",
    price: "$650",
    oldPrice: "$1000",
    store: "Unimarc",
  },
    {
    name: "Tallarin",
    price: "$650",
    oldPrice: "$1000",
    store: "Unimarc",
  },
    {
    name: "Tallarin",
    price: "$650",
    oldPrice: "$1000",
    store: "Unimarc",
  },
    {
    name: "Tallarin",
    price: "$650",
    oldPrice: "$1000",
    store: "Unimarc",
  },
    {
    name: "Tallarin",
    price: "$650",
    oldPrice: "$1000",
    store: "Unimarc",
  },
    {
    name: "Tallarin",
    price: "$650",
    oldPrice: "$1000",
    store: "Unimarc",
  },
]

export function Navbar() {

  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useUser();

  return (
    <header className="fixed top-0 left-0 w-screen h-16 bg-[#292F42] px-4 flex items-center justify-between shadow-md z-50 text-white">
      <button className="text-xl font-semibold pl-2" onClick={() => navigate('/')}>SuperPrecio</button>

      <div className="flex items-center gap-6 mr-10">
        {user && (
          <Popover>
            <PopoverTrigger asChild>
              <button className="relative text-muted-foreground hover:text-white transition">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-red-500 h-2 w-2 rounded-full" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-[#2E3142] text-white shadow-xl rounded-xl p-4 border-[#292F42]">
              <h4 className="text-center font-semibold mb-4">
                Hemos encontrado ofertas según tus preferencias
              </h4>
              <div className="space-y-3 max-h-[20vh] overflow-y-auto scrollbar-thin-dark">
                {notifications.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between bg-white text-black rounded-xl px-4 py-2"
                  >
                    <div className="font-semibold">{item.name}</div>
                    <div className="flex flex-col items-end text-sm">
                      <span className="text-[#00C853] font-bold">{item.price}</span>
                      <span className="text-gray-400 line-through">{item.oldPrice}</span>
                      <span className="text-xs text-gray-400">{item.store}</span>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        )}

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
            {user ? (
              <>
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => console.log("Perfil")}>Perfil</DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log("Favoritos")}>Favoritos</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>Cerrar sesión</DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => navigate('/login')}>Iniciar sesión</DropdownMenuItem>
                <DropdownMenuItem onClick={() =>  navigate('/register')}>Crear cuenta</DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
