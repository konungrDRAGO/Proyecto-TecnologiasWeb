import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";


interface User {
  name: string;
  avatarUrl: string;
  role: "admin" | "user"| "lecture"| "support";
}

interface UserContextType {
  user: User | null;
  login: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser({
      name: "Juan Saavedra",
      avatarUrl: "https://github.com/shadcn.png",
      role: "admin",
    });
  };

  const logout = () => {
    setUser(null);
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
