import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { loginUsuario } from "@/services/usuarioServices";

interface User {
  name: string;
  avatarUrl: string;
  role: "ADMINISTRADOR" | "USUARIO" | "LECTURA" | "MODERADOR";
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<User["role"]>;
  logout: () => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Restaurar usuario desde localStorage si existe
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<User["role"]> => {
    try {
      const { usuario, token } = await loginUsuario(email, password);

      const userData: User = {
        name: usuario.nombre_completo,
        avatarUrl: "https://github.com/shadcn.png",
        role: usuario.rol as User["role"],
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", token);

      return userData.role;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de <UserProvider>");
  return context;
};
